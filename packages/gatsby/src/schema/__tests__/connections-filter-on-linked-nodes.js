const _ = require(`lodash`)
const { graphql } = require(`graphql`)
const nodeTypes = require(`../build-node-types`)
const nodeConnections = require(`../build-node-connections`)
const { buildNodesSchema } = require(`../index`)
const { clearUnionTypes } = require(`../infer-graphql-type`)
const { getExampleValues } = require(`../data-tree-utils`)
const {
  inferInputObjectStructureFromNodes,
} = require(`../infer-graphql-input-fields`)
const { store } = require(`../../redux`)
require(`../../db/__tests__/fixtures/ensure-loki`)()

function makeNodes() {
  return [
    { id: `child_1`, internal: { type: `Child` }, hair: `brown`, children: [] },
    {
      id: `child_2`,
      internal: { type: `Child` },
      children: [],
      hair: `blonde`,
      height: 101,
    },
    {
      id: `linked_A`,
      internal: { type: `Linked_A` },
      children: [],
      array: [{ linked___NODE: `linked_B` }],
      single: { linked___NODE: `linked_B` },
    },
    { id: `linked_B`, internal: { type: `Linked_B` }, children: [] },
  ]
}

async function queryResult(nodesData, query, { types = [] } = {}) {
  for (const node of nodesData) {
    store.dispatch({ type: `CREATE_NODE`, payload: node })
  }
  const typesGQL = await nodeTypes.buildAll({})
  const connections = nodeConnections.buildAll(_.values(typesGQL))

  // Pull off just the graphql node from each type object.
  const nodes = _.mapValues(typesGQL, `node`)

  const schema = buildNodesSchema({ ...connections, ...nodes })

  return graphql(schema, query)
}

describe(`filtering on linked nodes`, () => {
  beforeEach(() => {
    store.dispatch({ type: `DELETE_CACHE` })
  })
  clearUnionTypes()
  it(`filters on linked nodes via id`, async () => {
    let result = await queryResult(
      makeNodes().concat([
        {
          id: `child_2_link`,
          internal: { type: `Test` },
          children: [],
          linked___NODE: `child_2`,
          foo: `bar`,
        },
        {
          id: `child_1_linked`,
          internal: { type: `Test` },
          children: [],
          linked___NODE: `child_1`,
          foo: `baz`,
        },
      ]),
      `
        {
          allTest(filter: { linked: { hair: { eq: "blonde" } } }) {
            edges { node { linked { hair, height }, foo } }
          }
        }
      `
    )
    expect(result.data.allTest.edges.length).toEqual(1)
    expect(result.data.allTest.edges[0].node.linked.hair).toEqual(`blonde`)
    expect(result.data.allTest.edges[0].node.linked.height).toEqual(101)
    expect(result.data.allTest.edges[0].node.foo).toEqual(`bar`)
  })

  it(`returns nested linked fields`, async () => {
    let result = await queryResult(
      [
        {
          id: `child_2`,
          internal: { type: `Child` },
          children: [],
          hair: `blonde`,
          height: 101,
        },
        {
          id: `child_1_link`,
          internal: { type: `Test` },
          children: [],
          nested: {
            linked___NODE: `child_2`,
          },
          foo: `bar`,
        },
      ],
      `
        {
          allTest(filter: { nested: { linked: { hair: { eq: "blonde" } } } }) {
            edges { node { nested { linked { hair, height } }, foo } }
          }
        }
      `
    )
    expect(result.data.allTest.edges[0].node.nested.linked.hair).toEqual(
      `blonde`
    )
    expect(result.data.allTest.edges[0].node.nested.linked.height).toEqual(101)
    expect(result.data.allTest.edges[0].node.foo).toEqual(`bar`)
  })

  it(`returns all matching linked nodes`, async () => {
    let result = await queryResult(
      makeNodes().concat([
        {
          id: `child_2_link`,
          internal: { type: `Test` },
          children: [],
          linked___NODE: `child_2`,
          foo: `bar`,
        },
        {
          id: `child_2_link2`,
          internal: { type: `Test` },
          children: [],
          linked___NODE: `child_2`,
          foo: `baz`,
        },
      ]),
      `
        {
          allTest(filter: { linked: { hair: { eq: "blonde" } } }) {
            edges { node { linked { hair, height }, foo } }
          }
        }
      `
    )
    expect(result.data.allTest.edges[0].node.linked.hair).toEqual(`blonde`)
    expect(result.data.allTest.edges[0].node.linked.height).toEqual(101)
    expect(result.data.allTest.edges[0].node.foo).toEqual(`bar`)
    expect(result.data.allTest.edges[1].node.foo).toEqual(`baz`)
  })

  it(`handles elemMatch operator`, async () => {
    let result = await queryResult(
      makeNodes().concat([
        {
          id: `1`,
          internal: { type: `Test` },
          children: [],
          linked___NODE: [`child_1`, `child_2`],
          foo: `bar`,
        },
        {
          id: `2`,
          internal: { type: `Test` },
          children: [],
          linked___NODE: [`child_1`],
          foo: `baz`,
        },
        {
          id: `3`,
          internal: { type: `Test` },
          children: [],
          linked___NODE: [`child_2`],
          foo: `foo`,
        },
        {
          id: `4`,
          internal: { type: `Test` },
          children: [],
          array: [{ linked___NODE: [`child_1`, `child_2`] }],
          foo: `lorem`,
        },
        {
          id: `5`,
          internal: { type: `Test` },
          children: [],
          array: [
            { linked___NODE: [`child_1`] },
            { linked___NODE: [`child_2`] },
          ],
          foo: `ipsum`,
        },
        {
          id: `6`,
          internal: { type: `Test` },
          children: [],
          array: [{ linked___NODE: [`child_1`] }],
          foo: `sit`,
        },
        {
          id: `7`,
          internal: { type: `Test` },
          children: [],
          array: [{ linked___NODE: [`child_2`] }],
          foo: `dolor`,
        },
        {
          id: `8`,
          internal: { type: `Test` },
          children: [],
          foo: `ipsum`,
        },
      ]),
      `
        {
          eq:allTest(filter: { linked: { elemMatch: { hair: { eq: "brown" } } } }) {
            edges { node { foo } }
          }
          in:allTest(filter: { linked: { elemMatch: { hair: { in: ["brown", "blonde"] } } } }) {
            edges { node { foo } }
          }
          insideInlineArrayEq:allTest(filter: { array: { elemMatch: { linked: { elemMatch: { hair: { eq: "brown" } } } } } }) {
            edges { node { foo } }
          }
          insideInlineArrayIn:allTest(filter: { array: { elemMatch: { linked: { elemMatch: { hair: { in: ["brown", "blonde"] } } } } } }) {
            edges { node { foo } }
          }
        }
      `
    )

    const itemToEdge = item => {
      return {
        node: {
          foo: item,
        },
      }
    }

    expect(result.data.eq.edges).toEqual([`bar`, `baz`].map(itemToEdge))
    expect(result.data.in.edges).toEqual([`bar`, `baz`, `foo`].map(itemToEdge))
    expect(result.data.insideInlineArrayEq.edges).toEqual(
      [`lorem`, `ipsum`, `sit`].map(itemToEdge)
    )
    expect(result.data.insideInlineArrayIn.edges).toEqual(
      [`lorem`, `ipsum`, `sit`, `dolor`].map(itemToEdge)
    )
  })

  it(`doesn't mutate node object`, async () => {
    const allTestNodes = makeNodes()
    await queryResult(
      allTestNodes.concat([
        {
          id: `1`,
          internal: { type: `Test` },
          children: [],
          test: [
            {
              linked___NODE: `linked_A`,
            },
          ],
        },
      ]),
      `
        {
          allTest {
            edges { node { hair } }
          }
        }
      `
    )
    const originalTestNode = allTestNodes.find(
      node => node.internal.type === `Linked_A`
    )
    delete originalTestNode.children

    expect(getExampleValues({ typeName: `Linked_A` })).toEqual(originalTestNode)
  })

  it(`skips fields with missing nodes`, async () => {
    const fields = inferInputObjectStructureFromNodes({
      nodes: [],
      exampleValue: {
        movie___NODE: `foobar`,
      },
    }).inferredFields

    expect(Object.keys(fields)).toHaveLength(0)
  })
})
