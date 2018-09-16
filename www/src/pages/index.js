import React from "react"
import { graphql } from "gatsby"
import Helmet from "react-helmet"
import Layout from "../components/layout"
import presets, { colors } from "../utils/presets"
import { rhythm, options } from "../utils/typography"
import { WebpackIcon, ReactJSIcon, GraphQLIcon } from "../assets/logos"
import { vP } from "../components/gutters"
import Container from "../components/container"
import MastheadBg from "../components/masthead-bg"
import MastheadContent from "../components/masthead"
import Cards from "../components/cards"
import Card from "../components/card"
import UsedBy from "../components/used-by"
import CardHeadline from "../components/card-headline"
import Diagram from "../components/diagram"
import BlogPostPreviewItem from "../components/blog-post-preview-item"
import FuturaParagraph from "../components/futura-paragraph"
import CtaButton from "../components/cta-button"
import TechWithIcon from "../components/tech-with-icon"

class IndexRoute extends React.Component {
  render() {
    const blogPosts = this.props.data.allMarkdownRemark
    return (
      <Layout location={this.props.location}>
        <Helmet>
          <meta name="Description" content="Blazing fast modern site generator for React. Go beyond static sites: build blogs, ecommerce sites, full-blown apps, and more with Gatsby." />
        </Helmet>
        <div css={{ position: `relative` }}>
          <MastheadBg />
          <div
            css={{
              display: `flex`,
              flexDirection: `row`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
            }}
          >
            <MastheadContent />
            <UsedBy />
            <div
              css={{
                padding: rhythm(presets.gutters.default / 2),
                flex: `0 0 100%`,
                maxWidth: `100%`,
                [presets.Hd]: {
                  padding: vP,
                  paddingTop: 0,
                },
              }}
            >
              <div
                css={{
                  display: `flex`,
                  flexDirection: `row`,
                  flexWrap: `wrap`,
                  justifyContent: `space-between`,
                }}
              >
                <Cards>
                  <Card>
                    <CardHeadline>
                      Modern web tech without the headache
                    </CardHeadline>
                    <FuturaParagraph>
                      Enjoy the power of the latest web technologies –{` `}
                      <TechWithIcon icon={ReactJSIcon}>React.js</TechWithIcon>,
                      {` `}
                      <TechWithIcon icon={WebpackIcon}>Webpack</TechWithIcon>,
                      {` `}
                      modern JavaScript and CSS and more — all setup and waiting
                      for you to start building.
                    </FuturaParagraph>
                  </Card>
                  <Card>
                    <CardHeadline>Bring your own data</CardHeadline>
                    <FuturaParagraph>
                      Gatsby’s rich data plugin ecosystem lets you build sites
                      with the data you want — from one or many sources: Pull
                      data from headless CMSs, SaaS services, APIs, databases,
                      your file system & more directly into your pages using
                      {` `}
                      <TechWithIcon icon={GraphQLIcon}>GraphQL</TechWithIcon>.
                    </FuturaParagraph>
                  </Card>
                  <Card>
                    <CardHeadline>Scale to the entire internet</CardHeadline>
                    <FuturaParagraph>
                      Gatsby.js is Internet Scale. Forget complicated deploys
                      with databases and servers and their expensive,
                      time-consuming setup costs, maintenance, and scaling
                      fears. Gatsby.js builds your site as “static” files which
                      can be deployed easily on dozens of services.
                    </FuturaParagraph>
                  </Card>
                  <Card>
                    <CardHeadline>Future-proof your website</CardHeadline>
                    <FuturaParagraph>
                      Don't build a website with last decade's tech. The future
                      of the web is mobile, JavaScript and APIs—the {` `}
                      <a href="https://jamstack.org/">JAMstack</a>. Every
                      website is a web app and every web app is a website.
                      Gatsby.js is the universal JavaScript framework you’ve
                      been waiting for.
                    </FuturaParagraph>
                  </Card>
                  <Card>
                    <CardHeadline>
                      <em css={{ color: colors.gatsby, fontStyle: `normal` }}>
                        Static
                      </em>
                      {` `}
                      Progressive Web Apps
                    </CardHeadline>
                    <FuturaParagraph>
                      Gatsby.js is a static PWA (Progressive Web App) generator.
                      You get code and data splitting out-of-the-box. Gatsby
                      loads only the critical HTML, CSS, data, and JavaScript so
                      your site loads as fast as possible. Once loaded, Gatsby
                      prefetches resources for other pages so clicking around
                      the site feels incredibly fast.
                    </FuturaParagraph>
                  </Card>
                  <Card>
                    <CardHeadline>Speed past the competition</CardHeadline>
                    <FuturaParagraph>
                      Gatsby.js builds the fastest possible website. Instead of
                      waiting to generate pages when requested, pre-build pages
                      and lift them into a global cloud of servers — ready to be
                      delivered instantly to your users wherever they are.
                    </FuturaParagraph>
                  </Card>

                  <Diagram />

                  <div css={{ flex: `1 1 100%` }}>
                    <Container hasSideBar={false}>
                      <div
                        css={{
                          textAlign: `center`,
                          padding: `${rhythm(1)} 0 ${rhythm(2)}`,
                        }}
                      >
                        <h1 css={{ marginTop: 0 }}>Curious yet?</h1>
                        <FuturaParagraph>
                          It only takes a few minutes to get up and running!
                        </FuturaParagraph>
                        <CtaButton
                          to="/docs/"
                          overrideCSS={{ marginTop: `1rem` }}
                        >
                          Get Started
                        </CtaButton>
                      </div>
                    </Container>
                  </div>

                  <div
                    css={{
                      borderTop: `1px solid ${colors.ui.light}`,
                      flex: `1 1 100%`,
                      [presets.Tablet]: {
                        paddingTop: rhythm(1),
                      },
                    }}
                  >
                    <Container
                      hasSideBar={false}
                      overrideCSS={{
                        maxWidth: rhythm(30),
                        paddingBottom: `0 !important`,
                      }}
                    >
                      <h2
                        css={{
                          textAlign: `left`,
                          marginTop: 0,
                          color: colors.gatsby,
                          [presets.Tablet]: {
                            paddingBottom: rhythm(1),
                          },
                        }}
                      >
                        Latest from the Gatsby blog
                      </h2>
                      {blogPosts.edges.map(({ node }) => (
                        <BlogPostPreviewItem
                          post={node}
                          key={node.fields.slug}
                          css={{ marginBottom: rhythm(2) }}
                        />
                      ))}
                      <CtaButton
                        to="/blog/"
                        overrideCSS={{
                          marginBottom: rhythm(options.blockMarginBottom * 2),
                        }}
                      >
                        Read More
                      </CtaButton>
                    </Container>
                  </div>
                </Cards>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default IndexRoute

export const pageQuery = graphql`
  query {
    file(relativePath: { eq: "gatsby-explanation.png" }) {
      childImageSharp {
        fluid(maxWidth: 870) {
          src
          srcSet
          sizes
        }
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 3
      filter: {
        frontmatter: { draft: { ne: true } }
        fileAbsolutePath: { regex: "/docs.blog/" }
      }
    ) {
      edges {
        node {
          ...BlogPostPreview_item
        }
      }
    }
  }
`
