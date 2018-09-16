import React, { Component } from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import hex2rgba from "hex2rgba"
import { style } from "glamor"

import styles from "../shared/styles"
import MdArrowForward from "react-icons/lib/md/arrow-forward"
import ShowcaseItemCategories from "./showcase-item-categories"
import FeaturedSitesIcon from "../../assets/featured-sites-icons.svg"
import { ShowcaseIcon } from "../../assets/mobile-nav-icons"
import URLQuery from "../../components/url-query"
import { options, rhythm, scale } from "../../utils/typography"
import presets, { colors } from "../../utils/presets"
import scrollToAnchor from "../../utils/scroll-to-anchor"

class FeaturedSites extends Component {
  onClickHandler = (target, updateQuery, filter) =>
    target.current
      ? scrollToAnchor(target.current, () => {
          updateQuery(({ filters }) => {
            return { filters: [filter] }
          })
        })
      : () => {}

  render = () => {
    const { featured, showcase } = this.props

    return (
      <section
        className="featured-sites"
        css={{
          margin: `${rhythm(options.blockMarginBottom)} ${rhythm(3 / 4)} 0`,
          position: `relative`,
          display: `none`,
          [presets.Desktop]: {
            display: `block`,
          },
        }}
      >
        <div
          css={{
            background: `url(${FeaturedSitesIcon})`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: `contain`,
            position: `absolute`,
            height: `100%`,
            width: `100%`,
            left: -100,
            opacity: 0.02,
            top: 0,
            zIndex: -1,
          }}
        />
        <div
          css={{
            marginBottom: rhythm(options.blockMarginBottom * 2),
            display: `flex`,
            alignItems: `center`,
            flexWrap: `wrap`,
          }}
        >
          <img src={FeaturedSitesIcon} alt="icon" css={{ marginBottom: 0 }} />
          <h1
            css={{
              ...scale(1 / 5),
              color: colors.gatsby,
              fontFamily: options.headerFontFamily.join(`,`),
              fontWeight: `bold`,
              marginRight: 30,
              marginLeft: 15,
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            Featured Sites
          </h1>
          <URLQuery>
            {(_, updateQuery) => (
              <a
                href="#showcase"
                {...styles.withTitleHover}
                css={{
                  display: `none`,
                  [presets.Phablet]: {
                    display: `block`,
                  },
                  "&&": {
                    ...scale(-1 / 6),
                    boxShadow: `none`,
                    borderBottom: 0,
                    color: colors.lilac,
                    cursor: `pointer`,
                    fontFamily: options.headerFontFamily.join(`,`),
                    fontWeight: `normal`,
                    "&:hover": {
                      background: `transparent`,
                      color: colors.gatsby,
                    },
                  },
                }}
                onClick={this.onClickHandler(showcase, updateQuery, `Featured`)}
              >
                <span className="title">View all</span>
                &nbsp;
                <MdArrowForward
                  style={{ marginLeft: 4, verticalAlign: `sub` }}
                />
              </a>
            )}
          </URLQuery>
          <div
            css={{
              display: `flex`,
              alignItems: `center`,
              marginLeft: `auto`,
            }}
          >
            <div
              css={{
                ...scale(-1 / 6),
                color: colors.gray.calm,
                marginRight: 15,
                fontFamily: options.headerFontFamily.join(`,`),
                display: `none`,
                [presets.Tablet]: {
                  display: `block`,
                },
              }}
            >
              Want to get featured?
            </div>
            <a
              href="https://next.gatsbyjs.org/docs/site-showcase-submissions/"
              target="_blank"
              rel="noopener noreferrer"
              css={{ ...styles.button }}
            >
              Submit
              {` `}
              <span
                css={{
                  display: `none`,
                  [presets.Desktop]: {
                    display: `inline`,
                  },
                }}
              >
                your
                {` `}
              </span>
              Site
              <MdArrowForward style={{ marginLeft: 4, verticalAlign: `sub` }} />
            </a>
          </div>
        </div>
        <div
          css={{
            position: `relative`,
          }}
        >
          <div
            css={{
              display: `flex`,
              overflowX: `scroll`,
              flexShrink: 0,
              margin: `0 -${rhythm(3 / 4)}`,
              padding: `3px ${rhythm(3 / 4)} 0`,
              ...styles.scrollbar,
            }}
          >
            {featured.slice(0, 9).map(({ node }) => (
              <div
                key={node.id}
                {...styles.featuredSitesCard}
                {...styles.withTitleHover}
              >
                <Link
                  css={{
                    "&&": {
                      borderBottom: `none`,
                      boxShadow: `none`,
                      transition: `box-shadow .3s cubic-bezier(.4,0,.2,1), transform .3s cubic-bezier(.4,0,.2,1)`,
                      "&:hover": { ...styles.screenshotHover },
                    },
                  }}
                  to={node.fields.slug}
                  state={{ isModal: true }}
                >
                  {node.childScreenshot && (
                    <Img
                      fluid={
                        node.childScreenshot.screenshotFile.childImageSharp
                          .fluid
                      }
                      alt={node.title}
                      css={{ ...styles.screenshot }}
                    />
                  )}
                  <div>
                    <span className="title">{node.title}</span>
                  </div>
                </Link>
                <div
                  css={{
                    ...scale(-1 / 6),
                    color: colors.gray.calm,
                    fontWeight: `normal`,
                    [presets.Desktop]: {
                      marginTop: `auto`,
                    },
                  }}
                >
                  {node.built_by && (
                    <div
                      css={{
                        fontFamily: options.headerFontFamily.join(`,`),
                      }}
                    >
                      Built by {node.built_by}
                    </div>
                  )}
                  <ShowcaseItemCategories
                    categories={node.categories}
                    onClickHandler={this.onClickHandler}
                    showcase={showcase}
                  />
                </div>
              </div>
            ))}
            <div
              css={{
                display: `flex`,
              }}
            >
              <URLQuery>
                {(_, updateQuery) => (
                  <a
                    href="#showcase"
                    {...styles.featuredSitesCard}
                    css={{
                      marginRight: `${rhythm(3 / 4)} !important`,
                      border: `1px solid ${hex2rgba(colors.lilac, 0.2)}`,
                      borderRadius: presets.radius,
                      textAlign: `center`,
                      "&&": {
                        boxShadow: `none`,
                        transition: `all ${presets.animation.speedDefault} ${
                          presets.animation.curveDefault
                        }`,
                        "&:hover": {
                          backgroundColor: hex2rgba(colors.ui.light, 0.25),
                          transform: `translateY(-3px)`,
                          boxShadow: `0 8px 20px ${hex2rgba(
                            colors.lilac,
                            0.5
                          )}`,
                        },
                      },
                    }}
                    onClick={this.onClickHandler(
                      showcase,
                      updateQuery,
                      `Featured`
                    )}
                  >
                    <div
                      css={{
                        margin: rhythm(1),
                        background: colors.ui.whisper,
                        display: `flex`,
                        alignItems: `center`,
                        position: `relative`,
                        flexBasis: `100%`,
                      }}
                    >
                      <img
                        src={ShowcaseIcon}
                        css={{
                          position: `absolute`,
                          height: `100%`,
                          width: `auto`,
                          display: `block`,
                          margin: `0`,
                          opacity: 0.04,
                        }}
                        alt=""
                      />
                      <span
                        css={{
                          margin: `0 auto`,
                          color: colors.gatsby,
                        }}
                      >
                        <img
                          src={ShowcaseIcon}
                          css={{
                            height: 44,
                            width: `auto`,
                            display: `block`,
                            margin: `0 auto ${rhythm(
                              options.blockMarginBottom
                            )}`,
                            [presets.Tablet]: {
                              height: 64,
                            },
                            [presets.Hd]: {
                              height: 72,
                            },
                          }}
                          alt=""
                        />
                        View all Featured Sites
                      </span>
                    </div>
                  </a>
                )}
              </URLQuery>
            </div>
          </div>
          <div
            css={{
              position: `absolute`,
              top: `0`,
              bottom: rhythm(options.blockMarginBottom),
              right: `-${rhythm(3 / 4)}`,
              width: 60,
              pointerEvents: `none`,
              background: `linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,255,255,1) 100%)`,
            }}
          />
        </div>
      </section>
    )
  }
}

export default FeaturedSites
