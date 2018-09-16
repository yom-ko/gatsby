import React from "react"
import { Link } from "gatsby"
import Helmet from "react-helmet"

import Layout from "../../components/layout"
import { itemListDocs } from "../../utils/sidebar/item-list"
import Container from "../../components/container"
import EmailCaptureForm from "../../components/email-capture-form"
import DocSearchContent from "../../components/docsearch-content"
import presets from "../../utils/presets"

class IndexRoute extends React.Component {
  render() {
    return (
      <Layout location={this.props.location} itemList={itemListDocs}>
        <DocSearchContent>
          <Container>
            <Helmet>
              <title>Docs</title>
            </Helmet>
            <h1 id="get-started" css={{ marginTop: 0 }}>
              Get started
            </h1>
            <p>Gatsby is a blazing fast modern site generator for React.</p>
            <h2>
              Install Gatsby
              {`'`}s command line tool
            </h2>
            <p>
              <code>npm install --global gatsby-cli</code>
            </p>
            <h2 id="using-the-gatsby-cli">Using the Gatsby CLI</h2>
            <ol>
              <li>
                <p>Create a new site.</p>
                <div className="gatsby-highlight" data-language="bash">
                  <pre className="language-bash">
                    <code className="language-bash">
                      gatsby new gatsby-site
                      https://github.com/gatsbyjs/gatsby-starter-default#v2
                    </code>
                  </pre>
                </div>
              </li>
              <li>
                <code>cd gatsby-site</code>
              </li>
              <li>
                <code>gatsby develop</code> — Gatsby will start a hot-reloading
                development environment accessible at
                {` `}
                <code>localhost:8000</code>
              </li>
              <li>
                Try editing the javascript pages in <code>src/pages</code>.
                Saved changes will live reload in the browser.
              </li>
              <li>
                <code>gatsby build</code> — Gatsby will perform an optimized
                production build for your site generating static HTML and
                per-route JavaScript code bundles.
              </li>
              <li>
                <code>gatsby serve</code> — Gatsby starts a local HTML server
                for testing your built site.
              </li>
            </ol>
            <p>
              To see detailed documentation for the CLI commands, run in the
              terminal <code>gatsby --help</code> and for specific commands
              {` `}
              <code>gatsby COMMAND_NAME --help</code> e.g.
              {` `}
              <code>gatsby develop --help</code>.
            </p>
            <h2 id="using-other-starters">Using other starters</h2>
            <p>
              Running <code>gatsby new</code> installs the default Gatsby
              starter. There are
              {` `}
              <Link to="/docs/gatsby-starters/">
                many other official and community starters
              </Link>
              {` `}
              you can use to kickstart building your Gatsby site.
            </p>
            <h2 id="work-through-the-tutorial">Work through the tutorial</h2>
            <p>
              It walks you through building a Gatsby site from scratch to a
              finished polished site.
              {` `}
              <Link to="/tutorial/">Go to the tutorial</Link>.
            </p>
            <div
              css={{
                display: `block`,
                [presets.Tablet]: {
                  display: `none`,
                },
              }}
            >
              <h2>Documentation</h2>
            </div>
            <EmailCaptureForm signupMessage="Want to keep up with the latest tips & tricks? Subscribe to our newsletter!" />
          </Container>
        </DocSearchContent>
      </Layout>
    )
  }
}

export default IndexRoute
