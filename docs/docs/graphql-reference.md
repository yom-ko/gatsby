---
title: GraphQL Reference
---

> Work in progress - pull requests showing additional examples are strongly encouraged.

## Intro

This page will walk you through a series of GraphQL queries, each designed to demonstrate a particular feature of GraphQL. You'll be querying the _real_ schema used on gatsbyjs.org so feel free to experiment and poke around the innards of our site!

You'll be using GraphiQL, an interactive editor you can also use [while building your Gatsby site](/tutorial/part-five/#introducing-graphiql).

## Basic query

Let's start with the basics, pulling up the site `title` from your `gatsby-config.js`'s `siteMetaData`. Here the query is on the left and the results are on the right.

<iframe src="https://gatsbygraphql.sloppy.zone/?query=%7B%0A%20%20site%20%7B%0A%20%20%20%20siteMetadata%20%7B%0A%20%20%20%20%20%20title%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D" width="600" height="400"></iframe>

Try editing the query to include the `description` from `siteMetadata`. When typing in the query editor you can use `Ctrl + Space` to see autocomplete options and `Ctrl + Enter` to run the current query.

## A longer query

Gatsby structures its content as collections of `nodes`, which are connected to each other with `edges`. In this query you ask for the total count of plugins in this Gatsby site, along with specific information about each one.

<iframe src="https://gatsbygraphql.sloppy.zone/?query=%7B%0A%20%20allSitePlugin%20%7B%0A%20%20%20%20totalCount%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20version%0A%20%20%20%20%20%20%20%20packageJson%20%7B%0A%20%20%20%20%20%20%20%20%20%20description%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A" width="600" height="400"></iframe>

Try using the editor's autocomplete (`Ctrl + Space`) to get extended details from the `packageJson` nodes.

## Limit

There are several ways to reduce the number of results from a query. Here `totalCount` tells you there's a few hundred results, but `limit` is used to show only the first two.

<iframe src="https://gatsbygraphql.sloppy.zone/?query=%7B%0A%20%20allMarkdownRemark(%0A%20%20%20%20limit%3A%202%0A%20%20)%20%7B%0A%20%20%20%20totalCount%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20frontmatter%20%7B%0A%20%20%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A" width="600" height="400"></iframe>

## Skip

Skip over a number of results. In this query `skip` is used to omit the first 3 results.

<iframe src="https://gatsbygraphql.sloppy.zone/?query=%7B%0A%20%20allMarkdownRemark(skip%3A%203)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A" width="600" height="400"></iframe>

## Filter

In this query `filter` and the `ne` (not equals) operator is used to show only results that have a title.

<iframe src="https://gatsbygraphql.sloppy.zone/?query=%7B%0A%20%20allMarkdownRemark(%0A%20%20%20%20filter%3A%20%7B%0A%20%20%20%20%20%20frontmatter%3A%20%7B%20title%3A%20%7B%20ne%3A%20%22%22%20%7D%20%7D%0A%20%20%09%7D%0A%20%20)%20%7B%0A%20%20%20%20totalCount%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20frontmatter%20%7B%0A%20%20%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A" width="600" height="400"></iframe>

Gatsby relies on [Sift](https://www.npmjs.com/package/sift) to enable MongoDB-like query syntax for object filtering. This allows Gatsby to support operators like `eq`, `ne`, `in`, `regex` and querying nested fields through the `__` connector.

It is also possible to filter on multiple fields - just separate the individual filters by a comma (works as an AND):

```js
filter: { contentType: { in: ["post", "page"] }, draft: { eq: false } }
```

A good video tutorial on this is [here](https://www.youtube.com/watch?v=Lg1bom99uGM).

> TODO: Add more advanced examples

## Sort

The ordering of your results can be specified with `sort`. Here the results are sorted in ascending order of `frontmatter`'s `date` field.

<iframe src="https://gatsbygraphql.sloppy.zone/?query=%7B%0A%20%20allMarkdownRemark(%0A%20%20%20%20sort%3A%20%7Bfields%3A%20%5Bfrontmatter___date%5D%2C%20order%3A%20ASC%7D%2C%0A%20%20)%20%7B%0A%20%20%20%20totalCount%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20frontmatter%20%7B%0A%20%20%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20%20%20date%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0A" width="600" height="400"></iframe>

> TODO: Can you sort on multiple fields?

## Format

Dates can be formatted using the `formatString` function.

<iframe src="https://gatsbygraphql.sloppy.zone/?query=%7B%0A%20%20allMarkdownRemark(%0A%20%20%20%20filter%3A%20%7Bfrontmatter%3A%20%7Bdate%3A%20%7Bne%3A%20null%7D%7D%7D%0A%20%20)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20frontmatter%20%7B%0A%20%20%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20%20%20date(formatString%3A%20%22dddd%20DD%20MMMM%20YYYY%22)%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D" width="600" height="400"></iframe>

Gatsby relies on [Moment.js](https://momentjs.com/) to format the dates. This allows you to use any tokens in your string. See [moment.js documentation](https://momentjs.com/docs/#/displaying/format/) for more tokens.

Example: [`anotherDate(formatString: "dddd, MMMM Do YYYY, h:mm:ss a") # Sunday, August 5th 2018, 10:56:14 am`](<https://gatsbygraphql.sloppy.zone/?query=%7B%0A%20%20allMarkdownRemark(%0A%20%20%20%20filter%3A%20%7Bfrontmatter%3A%20%7Bdate%3A%20%7Bne%3A%20null%7D%7D%7D%0A%20%20)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20frontmatter%20%7B%0A%20%20%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20%20%20%23%20Sunday%2C%20August%205th%202018%2C%2010%3A56%3A14%20am%60%0A%20%20%20%20%20%20%20%20%20%20date(formatString%3A%20%22dddd%2C%20MMMM%20Do%20YYYY%2C%20h%3Amm%3Ass%20a%22)%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D>)

> TODO: Expand on the possibilities of formatting - which fields can be formatted? What are the available formatting options?

## Sort, filter, limit & format together

This query combines sorting, filtering, limiting and formatting together.

<iframe src="https://gatsbygraphql.sloppy.zone/?query=%7B%0A%20%20allMarkdownRemark(%0A%20%20%20%20limit%3A%203%0A%20%20%20%20filter%3A%20%7B%0A%20%20%20%20%20%20frontmatter%3A%20%7Bdate%3A%20%7Bne%3A%20null%7D%7D%0A%20%20%20%20%7D%0A%20%20%20%20sort%3A%20%7Bfields%3A%20%5Bfrontmatter___date%5D%2C%20order%3A%20DESC%7D%0A%20%20)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20fields%7B%0A%20%20%20%20%20%20%20%20%20%20slug%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20frontmatter%20%7B%0A%20%20%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20%20%20date(formatString%3A%20%22dddd%20DD%20MMMM%20YYYY%22)%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D" width="600" height="400"></iframe>

## Query variables

In addition to adding query arguments directly to queries, GraphQL allows to pass in "query variables". These can be both simple scalar values as well as objects.

The query below is the same one as the previous example, but with the input arguments passed in as "query variables".

To add variables to page component queries, pass these in the `context` object [when creating pages](/docs/creating-and-modifying-pages/#creating-pages-in-gatsby-nodejs).

<iframe src="https://gatsbygraphql.sloppy.zone/?query=query%20GetBlogPosts(%24limit%3A%20Int%2C%20%24filter%3A%20filterMarkdownRemark%2C%20%24sort%3A%20markdownRemarkConnectionSort)%20%7B%0A%09allMarkdownRemark(%0A%20%20%20%20limit%3A%20%24limit%2C%0A%20%20%20%20filter%3A%20%24filter%2C%0A%20%20%20%20sort%3A%20%24sort%0A%20%20)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20fields%7B%0A%20%20%20%20%20%20%20%20%20%20slug%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20frontmatter%20%7B%0A%20%20%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20%20%20date(formatString%3A%20%22dddd%20DD%20MMMM%20YYYY%22)%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%20%20%20%20%0A%7D&operationName=GetBlogPosts&variables=%7B%0A%20%20%22limit%22%3A%203%2C%0A%20%20%22filter%22%3A%20%7B%0A%20%20%20%20%22frontmatter%22%3A%20%7B%0A%20%20%20%20%20%20%22date%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22ne%22%3A%20null%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%2C%0A%20%20%22sort%22%3A%20%7B%0A%20%20%20%20%22fields%22%3A%20%22frontmatter___date%22%2C%0A%20%20%20%20%22order%22%3A%20%22DESC%22%0A%20%20%7D%0A%7D" width="600" height="400"></iframe>

## Group

You can also group values on the basis of a field e.g. the title, date or category and get the field value, the total number of occurrences and edges.

The query below gets us all authors (`fieldValue`) who wrote a blogpost and how many blogposts (`totalCount`) they wrote. In addition we're grabbing the `title` and `slug` of the author's articles.

<iframe src="https://gatsbygraphql.sloppy.zone/?query=%7B%0A%20%20allMarkdownRemark(filter%3A%20%7BfileAbsolutePath%3A%20%7Bregex%3A%20%22%2Fdocs.blog%2F%22%7D%7D)%20%7B%0A%20%20%20%20group(field%3A%20frontmatter___author)%20%7B%0A%20%20%20%20%20%20fieldValue%0A%20%20%20%20%20%20totalCount%0A%20%20%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20%20%20fields%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20slug%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20frontmatter%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D" width="600" height="400"></iframe>

## Fragments

Fragments are a way to save frequently used queries for re-use. To create a fragment, define it in a query and export it as a named export from any file Gatsby is aware of. A fragment is available for use in any other GraphQL query, regardless of location in the project. Fragments defined in a Gatsby project are global, so names must be unique.

The query below defines a fragment to get the site title, and then uses the fragment to access this information.

<iframe src="https://gatsbygraphql.sloppy.zone/?query=%23%20Code%20borrowed%20from%20https%3A%2F%2Fwww.gatsbycentral.com%2Freusable-graphql-queries-in-gatsby%0Afragment%20fragName%20on%20Site%20%7B%0A%20%20siteMetadata%20%7B%0A%20%20%20%20title%0A%20%20%7D%0A%7D%0A%0A%7B%0A%20%20site%20%7B%0A%20%20%20%20...fragName%0A%20%20%7D%0A%7D" width="600" height="400"></iframe>

## Aliasing

Want to run two queries on the same datasource? You can do this by aliasing your queries. See below for an example:

<iframe src="https://gatsbygraphql.sloppy.zone/?query=%7B%0AsomeEntries%3AallMarkdownRemark(limit%3A3)%7B%0A%20%20%20edges%7B%0A%20%20%20%20%20node%7B%0A%20%20%20%20%20%20%20id%0A%20%20%20%20%20%7D%0A%20%20%20%7D%0A%20%7D%0A%20someMoreEntries%3AallMarkdownRemark(limit%3A3)%7B%0A%20%20%20edges%7B%0A%20%20%20%20%20node%7B%0A%20%20%20%20%20%20%20id%0A%20%20%20%20%20%7D%0A%20%20%20%7D%0A%20%7D%0A%7D" width="600" height="400"></iframe>

When you use your data, you will be able to reference it using the alias instead of the root query name. In this example, that would be `data.someEntries` or `data.someMoreEntries` instead of `data.allMarkdownRemark`.

## Where next?

Try [running your own queries](<https://gatsbygraphql.sloppy.zone/?query=%23%20Welcome%20to%20GraphiQL%0A%23%0A%23%20GraphiQL%20is%20an%20in-browser%20tool%20for%20writing%2C%20validating%2C%20and%0A%23%20testing%20GraphQL%20queries.%0A%23%0A%23%20Type%20queries%20into%20this%20side%20of%20the%20screen%2C%20and%20you%20will%20see%20intelligent%0A%23%20typeaheads%20aware%20of%20the%20current%20GraphQL%20type%20schema%20and%20live%20syntax%20and%0A%23%20validation%20errors%20highlighted%20within%20the%20text.%0A%23%0A%23%20GraphQL%20queries%20typically%20start%20with%20a%20%22%7B%22%20character.%20Lines%20that%20starts%0A%23%20with%20a%20%23%20are%20ignored.%0A%23%0A%23%20All%20the%20data%20behind%20gatsbyjs.org%20can%20be%20queried%20from%20here.%20Below%20is%20%0A%23%20an%20example%20query%20to%20get%20you%20started.%0A%23%0A%23%20Keyboard%20shortcuts%3A%0A%23%0A%23%20%20Prettify%20Query%3A%20%20Shift-Ctrl-P%20(or%20press%20the%20prettify%20button%20above)%0A%23%0A%23%20%20%20%20%20%20%20Run%20Query%3A%20%20Ctrl-Enter%20(or%20press%20the%20play%20button%20above)%0A%23%0A%23%20%20%20Auto%20Complete%3A%20%20Ctrl-Space%20(or%20just%20start%20typing)%0A%23%0A%0A%7B%0A%20%20allSitePage(%0A%20%20%20%20limit%3A%205%0A%20%20)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20path%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D>), check out the rest of [the docs](/docs/) or run through [the tutorial](/tutorial/).
