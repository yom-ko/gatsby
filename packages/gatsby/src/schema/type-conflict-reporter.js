// @flow
const _ = require(`lodash`)
const report = require(`gatsby-cli/lib/reporter`)
const typeOf = require(`type-of`)
const util = require(`util`)
const { findRootNodeAncestor } = require(`../db/node-tracking`)

export type TypeConflictExample = {
  value: mixed,
  parent: {},
  type: string,
  arrayTypes: string[],
}

type TypeConflict = {
  value: mixed,
  description: string,
}

const isNodeWithDescription = node =>
  node && node.internal && node.internal.description

const findNodeDescription = obj => {
  if (obj) {
    const node = findRootNodeAncestor(obj, isNodeWithDescription)
    if (isNodeWithDescription(node)) {
      return node.internal.description
    }
  }
  return ``
}

const formatValue = value => {
  if (!_.isArray(value)) {
    return util.inspect(value, {
      colors: true,
      depth: 0,
      breakLength: Infinity,
    })
  }

  let wasElipsisLast = false
  const usedTypes = []
  const output = []

  value.forEach(item => {
    const type = typeOf(item)
    if (usedTypes.indexOf(type) !== -1) {
      if (!wasElipsisLast) {
        output.push(`...`)
        wasElipsisLast = true
      }
    } else {
      output.push(formatValue(item))
      wasElipsisLast = false
      usedTypes.push(type)
    }
  })

  return `[ ${output.join(`, `)} ]`
}

class TypeConflictEntry {
  selector: string
  types: Map<string, TypeConflict>

  constructor(selector: string) {
    this.selector = selector
    this.types = new Map()
  }

  addExample({ value, type, parent }: TypeConflictExample) {
    this.types.set(type, {
      value,
      description: findNodeDescription(parent),
    })
  }

  printEntry() {
    const sortedByTypeName = _.sortBy(
      Array.from(this.types.entries()),
      ([typeName, value]) => typeName
    )

    report.log(
      `${this.selector}:${sortedByTypeName
        .map(
          ([typeName, { value, description }]) =>
            `\n - type: ${typeName}\n   value: ${formatValue(
              value
            )}${description && `\n   source: ${description}`}`
        )
        .join(``)}`
    )
  }
}

class TypeConflictReporter {
  entries: Map<string, TypeConflictEntry>

  constructor() {
    this.entries = new Map()
  }

  clearConflicts() {
    this.entries.clear()
  }

  getEntryFromSelector(selector: string): TypeConflictEntry {
    let dataEntry = this.entries.get(selector)

    if (!dataEntry) {
      dataEntry = new TypeConflictEntry(selector)
      this.entries.set(selector, dataEntry)
    }

    return dataEntry
  }

  addConflict(selector: string, examples: TypeConflictExample[]) {
    if (selector.substring(0, 11) === `SitePlugin.`) {
      // Don't store and print out type conflicts in plugins.
      // This is out of user control so he can't do anything
      // to hide those.
      return
    }

    const entry = this.getEntryFromSelector(selector)
    examples
      .filter(example => example.value != null)
      .forEach(example => entry.addExample(example))
  }

  printConflicts() {
    if (this.entries.size > 0) {
      report.warn(
        `There are conflicting field types in your data. GraphQL schema will omit those fields.`
      )
      this.entries.forEach(entry => entry.printEntry())
    }
  }
}

const typeConflictReporter = new TypeConflictReporter()

const printConflicts = () => {
  typeConflictReporter.printConflicts()
}

module.exports = { typeConflictReporter, printConflicts, TypeConflictEntry }
