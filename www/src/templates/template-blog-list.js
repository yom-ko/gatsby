import React from "react"
import { graphql } from "gatsby"
import Helmet from "react-helmet"

import Layout from "../components/layout"
import Container from "../components/container"
import BlogPostPreviewItem from "../components/blog-post-preview-item"
import Pagination from "../components/pagination"
import EmailCaptureForm from "../components/email-capture-form"

import presets, { colors } from "../utils/presets"
import { rhythm, options } from "../utils/typography"
import logo from "../monogram.svg"

class BlogPostsIndex extends React.Component {
  render() {
    const { allMarkdownRemark } = this.props.data

    return (
      <Layout location={this.props.location}>
        <div
          css={{
            [presets.Tablet]: {
              background: colors.ui.whisper,
              paddingBottom: rhythm(options.blockMarginBottom * 4),
            },
          }}
        >
          <Helmet>
            <title>Blog</title>
          </Helmet>
          <Container
            css={{
              [presets.Tablet]: {
                background: `url(${logo})`,
                paddingBottom: `${rhythm(
                  options.blockMarginBottom * 4
                )} !important`,
                backgroundSize: `30px 30px`,
                backgroundRepeat: `no-repeat`,
                backgroundPosition: `bottom center`,
              },
            }}
          >
            <h1
              css={{
                marginTop: 0,
                [presets.Tablet]: {
                  marginTop: 0,
                  position: `absolute`,
                  width: 1,
                  height: 1,
                  padding: 0,
                  overflow: `hidden`,
                  clip: `rect(0,0,0,0)`,
                  whiteSpace: `nowrap`,
                  clipPath: `inset(50%)`,
                },
              }}
            >
              Blog
            </h1>
            {allMarkdownRemark.edges.map(({ node }) => (
              <BlogPostPreviewItem
                post={node}
                key={node.fields.slug}
                css={{
                  marginBottom: rhythm(options.blockMarginBottom),
                  [presets.Tablet]: {
                    background: `#fff`,
                    borderRadius: presets.radiusLg,
                    boxShadow: `0 3px 10px rgba(25, 17, 34, 0.05)`,
                    padding: rhythm(options.blockMarginBottom * 2),
                    paddingLeft: rhythm(options.blockMarginBottom * 3),
                    paddingRight: rhythm(options.blockMarginBottom * 3),
                    marginLeft: rhythm(-options.blockMarginBottom * 2),
                    marginRight: rhythm(-options.blockMarginBottom * 2),
                    transition: `transform ${presets.animation.speedDefault} ${
                      presets.animation.curveDefault
                    },  box-shadow ${presets.animation.speedDefault} ${
                      presets.animation.curveDefault
                    }, padding ${presets.animation.speedDefault} ${
                      presets.animation.curveDefault
                    }`,
                    "&:hover": {
                      transform: `translateY(-4px)`,
                      boxShadow: `0 10px 42px rgba(25, 17, 34, 0.1)`,
                    },
                    "&:active": {
                      boxShadow: `0 3px 10px rgba(25, 17, 34, 0.05)`,
                      transform: `translateY(0)`,
                      transition: `transform 50ms`,
                    },
                  },
                  [presets.Desktop]: {},
                  [presets.Hd]: {},
                }}
              />
            ))}
            <Pagination context={this.props.pageContext} />
            <EmailCaptureForm signupMessage="Enjoying our blog? Receive the next post in your inbox!" />
          </Container>
        </div>
      </Layout>
    )
  }
}

export default BlogPostsIndex

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: { draft: { ne: true } }
        fileAbsolutePath: { regex: "/docs.blog/" }
      }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          ...BlogPostPreview_item
        }
      }
    }
  }
`
