import React from "react"
import { graphql } from "gatsby"
import Helmet from "react-helmet"
import sortBy from "lodash/sortBy"

import Functions from "../../components/function-list"
import { rhythm, scale } from "../../utils/typography"
import Layout from "../../components/layout"
import Container from "../../components/container"
import { itemListDocs } from "../../utils/sidebar/item-list"

class BrowserAPIDocs extends React.Component {
  render() {
    const funcs = sortBy(
      this.props.data.file.childrenDocumentationJs,
      func => func.name
    )

    return (
      <Layout location={this.props.location} itemList={itemListDocs}>
        <Container>
          <Helmet>
            <title>Browser APIs</title>
          </Helmet>
          <h1 id="browser-apis" css={{ marginTop: 0 }}>
            Gatsby Browser APIs
          </h1>
          <h2 css={{ marginBottom: rhythm(1 / 2) }}>Usage</h2>
          <p css={{ marginBottom: rhythm(1) }}>
            Implement any of these APIs by exporting them from a file named
            {` `}
            <code>gatsby-browser.js</code> in the root of your project.
          </p>
          <hr />
          <h2 css={{ marginBottom: rhythm(1 / 2) }}>APIs</h2>
          <ul css={{ ...scale(-1 / 5) }}>
            {funcs.map((node, i) => (
              <li key={`function list ${node.name}`}>
                <a href={`#${node.name}`}>{node.name}</a>
              </li>
            ))}
          </ul>
          <br />
          <hr />
          <h2>Reference</h2>
          <Functions functions={funcs} />
        </Container>
      </Layout>
    )
  }
}

export default BrowserAPIDocs

export const pageQuery = graphql`
  query {
    file(relativePath: { regex: "/src.*api-browser-docs.js/" }) {
      childrenDocumentationJs {
        name
        ...FunctionList
      }
    }
  }
`
