// @flow
import path from "path"
const normalize = require(`normalize-path`)
import glob from "glob"

import { validate } from "graphql"
import { IRTransforms } from "relay-compiler"
import RelayParser from "relay-compiler/lib/RelayParser"
import ASTConvert from "relay-compiler/lib/ASTConvert"
import GraphQLCompilerContext from "relay-compiler/lib/GraphQLCompilerContext"
import filterContextForNode from "relay-compiler/lib/filterContextForNode"
const _ = require(`lodash`)

import { store } from "../../redux"
import FileParser from "./file-parser"
import GraphQLIRPrinter from "relay-compiler/lib/GraphQLIRPrinter"
import {
  graphqlError,
  graphqlValidationError,
  multipleRootQueriesError,
} from "./graphql-errors"
import report from "gatsby-cli/lib/reporter"
const websocketManager = require(`../../utils/websocket-manager`)

import type { DocumentNode, GraphQLSchema } from "graphql"

const { printTransforms } = IRTransforms

const {
  ValuesOfCorrectTypeRule,
  VariablesDefaultValueAllowedRule,
  FragmentsOnCompositeTypesRule,
  KnownTypeNamesRule,
  LoneAnonymousOperationRule,
  PossibleFragmentSpreadsRule,
  ScalarLeafsRule,
  VariablesAreInputTypesRule,
  VariablesInAllowedPositionRule,
} = require(`graphql`)

type RootQuery = {
  name: string,
  path: string,
  text: string,
  originalText: string,
  isStaticQuery: boolean,
  hash: string,
}

type Queries = Map<string, RootQuery>

const validationRules = [
  ValuesOfCorrectTypeRule,
  VariablesDefaultValueAllowedRule,
  FragmentsOnCompositeTypesRule,
  KnownTypeNamesRule,
  LoneAnonymousOperationRule,
  PossibleFragmentSpreadsRule,
  ScalarLeafsRule,
  VariablesAreInputTypesRule,
  VariablesInAllowedPositionRule,
]

let lastRunHadErrors = null
const overlayErrorID = `graphql-compiler`

class Runner {
  baseDir: string
  schema: GraphQLSchema
  errors: string[]
  fragmentsDir: string

  constructor(baseDir: string, fragmentsDir: string, schema: GraphQLSchema) {
    this.baseDir = baseDir
    this.fragmentsDir = fragmentsDir
    this.schema = schema
  }

  reportError(message) {
    const queryErrorMessage = `${report.format.red(`GraphQL Error`)} ${message}`
    report.panicOnBuild(queryErrorMessage)
    if (process.env.gatsby_executing_command === `develop`) {
      websocketManager.emitError(overlayErrorID, queryErrorMessage)
      lastRunHadErrors = true
    }
  }

  async compileAll() {
    let nodes = await this.parseEverything()
    return await this.write(nodes)
  }

  async parseEverything() {
    // FIXME: this should all use gatsby's configuration to determine parsable
    // files (and how to parse them)
    let files = glob.sync(`${this.fragmentsDir}/**/*.+(t|j)s?(x)`, {
      nodir: true,
    })
    files = files.concat(
      glob.sync(`${this.baseDir}/**/*.+(t|j)s?(x)`, { nodir: true })
    )
    files = files.filter(d => !d.match(/\.d\.ts$/))
    files = files.map(normalize)

    // Ensure all page components added as they're not necessarily in the
    // pages directory e.g. a plugin could add a page component.  Plugins
    // *should* copy their components (if they add a query) to .cache so that
    // our babel plugin to remove the query on building is active (we don't
    // run babel on code in node_modules). Otherwise the component will throw
    // an error in the browser of "graphql is not defined".
    files = files.concat(
      Array.from(store.getState().components.keys(), c => normalize(c))
    )
    files = _.uniq(files)

    let parser = new FileParser()

    return await parser.parseFiles(files)
  }

  async write(nodes: Map<string, DocumentNode>): Promise<Queries> {
    const compiledNodes: Queries = new Map()
    const namePathMap = new Map()
    const nameDefMap = new Map()
    const documents = []

    for (let [filePath, doc] of nodes.entries()) {
      let errors = validate(this.schema, doc, validationRules)

      if (errors && errors.length) {
        this.reportError(graphqlValidationError(errors, filePath))
        return compiledNodes
      }

      documents.push(doc)
      doc.definitions.forEach((def: any) => {
        const name: string = def.name.value
        namePathMap.set(name, filePath)
        nameDefMap.set(name, def)
      })
    }

    let compilerContext = new GraphQLCompilerContext(this.schema)
    try {
      compilerContext = compilerContext.addAll(
        ASTConvert.convertASTDocuments(
          this.schema,
          documents,
          validationRules,
          RelayParser.transform.bind(RelayParser)
        )
      )
    } catch (error) {
      this.reportError(graphqlError(namePathMap, nameDefMap, error))
      return compiledNodes
    }

    // relay-compiler v1.5.0 added "StripUnusedVariablesTransform" to
    // printTransforms. Unfortunately it currently doesn't detect variables
    // in input objects widely used in gatsby, and therefore removing
    // variable declaration from queries.
    // As a temporary workaround remove that transform by slicing printTransforms.
    const printContext = printTransforms
      .slice(0, -1)
      .reduce((ctx, transform) => transform(ctx, this.schema), compilerContext)

    compilerContext.documents().forEach((node: { name: string }) => {
      if (node.kind !== `Root`) return

      const { name } = node
      let filePath = namePathMap.get(name) || ``

      if (compiledNodes.has(filePath)) {
        let otherNode = compiledNodes.get(filePath)
        this.reportError(
          multipleRootQueriesError(
            filePath,
            nameDefMap.get(name),
            otherNode && nameDefMap.get(otherNode.name)
          )
        )
        return
      }

      let text = filterContextForNode(printContext.getRoot(name), printContext)
        .documents()
        .map(GraphQLIRPrinter.print)
        .join(`\n`)

      const query = {
        name,
        text,
        originalText: nameDefMap.get(name).text,
        path: filePath,
        isStaticQuery: nameDefMap.get(name).isStaticQuery,
        hash: nameDefMap.get(name).hash,
      }

      if (query.isStaticQuery) {
        query.jsonName =
          `sq--` +
          _.kebabCase(
            `${path.relative(store.getState().program.directory, filePath)}`
          )
      }
      compiledNodes.set(filePath, query)
    })

    if (
      process.env.gatsby_executing_command === `develop` &&
      lastRunHadErrors
    ) {
      websocketManager.emitError(overlayErrorID, null)
      lastRunHadErrors = false
    }

    return compiledNodes
  }
}
export { Runner }

export default async function compile(): Promise<Map<string, RootQuery>> {
  const { program, schema } = store.getState()

  const runner = new Runner(
    `${program.directory}/src`,
    `${program.directory}/.cache/fragments`,
    schema
  )

  const queries = await runner.compileAll()

  return queries
}
