# Using unstructured data in Gatsby

Many examples in the Gatsby docs focus on using source plugins. But you don’t need to use source plugins (or create Gatsby nodes) to pull data into a Gatsby site! This example uses "unstructured data", or data "handled outside of the Gatsby data layer". It uses the data directly, and does not transform the data into Gatsby nodes.

This example loads data from the [PokéAPI](https://www.pokeapi.co/)’s REST endpoints, then creates pages (and nested pages) using [Gatsby’s `createPages` API](https://www.gatsbyjs.org/docs/node-apis/#createPages).

You might also be interested in this [blog post on unstructured data](/blog/2018-10-25-unstructured-data/), or the relevant [docs page](/docs/using-unstructured-data/).

## What would this look like using Gatsby's GraphQL integration layer?

This example site is also intended as a direct comparison to the [using-local-plugins](../using-local-plugins) example, which take the exact same example, but shows how to use Gatsby's GraphQL layer, instead of using "unstructured data".
