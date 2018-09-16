import Typography from "typography"
import CodePlugin from "typography-plugin-code"
import presets, { colors } from "./presets"
import {
  MOBILE_MEDIA_QUERY,
  TABLET_MEDIA_QUERY,
  MIN_DEFAULT_MEDIA_QUERY,
  MIN_LARGER_DISPLAY_MEDIA_QUERY,
} from "typography-breakpoint-constants"

const headerFontFamily = [
  `Futura PT`,
  `-apple-system`,
  `BlinkMacSystemFont`,
  `Segoe UI`,
  `Roboto`,
  `Oxygen`,
  `Ubuntu`,
  `Cantarell`,
  `Fira Sans`,
  `Droid Sans`,
  `Helvetica Neue`,
  `Arial`,
  `sans-serif`,
]

const _options = {
  headerFontFamily,
  bodyFontFamily: [`Spectral`, `Georgia`, `Times New Roman`, `Times`, `serif`],
  monospaceFontFamily: [
    `Space Mono`,
    `SFMono-Regular`,
    `Menlo`,
    `Monaco`,
    `Consolas`,
    `Liberation Mono`,
    `Courier New`,
    `monospace`,
  ],
  systemFontFamily: [
    `-apple-system`,
    `BlinkMacSystemFont`,
    `Segoe UI`,
    `Roboto`,
    `Oxygen`,
    `Ubuntu`,
    `Cantarell`,
    `Fira Sans`,
    `Droid Sans`,
    `Helvetica Neue`,
    `Arial`,
    `sans-serif`,
  ],
  baseFontSize: `18px`,
  baseLineHeight: 1.4,
  headerLineHeight: 1.075,
  headerColor: colors.gray.dark,
  bodyColor: colors.gray.copy,
  blockMarginBottom: 0.75,
  scaleRatio: 2,
  plugins: [new CodePlugin()],
  overrideStyles: ({ rhythm, scale }, options) => {
    return {
      "h1,h2,h4,h5,h6": {
        marginTop: rhythm(options.blockMarginBottom * 2),
        marginBottom: rhythm(options.blockMarginBottom),
        letterSpacing: `-0.0075em`,
      },
      "ul, ol": {
        marginTop: rhythm(options.blockMarginBottom),
      },
      h1: {
        ...scale(4 / 5),
      },
      h3: {
        ...scale(2 / 5),
        lineHeight: 1,
        marginTop: rhythm(options.blockMarginBottom * 2),
        marginBottom: rhythm(options.blockMarginBottom / 2),
      },
      h4: {
        ...scale(1 / 5),
      },
      h5: {
        ...scale(0),
      },
      blockquote: {
        paddingLeft: rhythm(options.blockMarginBottom),
        marginLeft: 0,
        borderLeft: `${rhythm(options.blockMarginBottom / 4)} solid ${
          colors.ui.light
        }`,
      },
      hr: {
        backgroundColor: colors.ui.light,
      },
      "tt, code, kbd": {
        background: colors.code.bg,
        paddingTop: `0.1em`,
        paddingBottom: `0.1em`,
      },
      "tt, code, kbd, .gatsby-code-title": {
        fontFamily: options.monospaceFontFamily.join(`,`),
        fontSize: `80%`,
        // Disable ligatures as they look funny w/ Space Mono as code.
        fontVariant: `none`,
        WebkitFontFeatureSettings: `"clig" 0, "calt" 0`,
        fontFeatureSettings: `"clig" 0, "calt" 0`,
      },
      ".gatsby-highlight": {
        background: colors.code.bg,
        boxShadow: `inset 0 0 0 1px ${colors.code.border}`,
        borderRadius: `${presets.radius}px`,
        padding: rhythm(options.blockMarginBottom),
        marginBottom: rhythm(options.blockMarginBottom),
        overflow: `auto`,
        WebkitOverflowScrolling: `touch`,
        position: `relative`,
      },
      ".gatsby-highlight pre[class*='language-']": {
        padding: 0,
        marginTop: 0,
        marginBottom: 0,
        backgroundColor: `transparent`,
        border: 0,
        float: `left`,
        minWidth: `100%`,
        overflow: `initial`,
      },
      ".gatsby-highlight pre code": {
        display: `block`,
        fontSize: `95%`,
        lineHeight: options.baseLineHeight,
      },
      ".gatsby-highlight-code-line": {
        background: colors.code.border,
        marginRight: `${rhythm(-options.blockMarginBottom)}`,
        marginLeft: `${rhythm(-options.blockMarginBottom)}`,
        paddingRight: rhythm(options.blockMarginBottom),
        paddingLeft: `${rhythm((options.blockMarginBottom / 5) * 4)}`,
        borderLeft: `${rhythm((options.blockMarginBottom / 5) * 1)} solid ${
          colors.code.lineHighlightBorder
        }`,
        display: `block`,
      },
      ".gatsby-highlight::-webkit-scrollbar": {
        width: `6px`,
        height: `6px`,
      },
      ".gatsby-highlight::-webkit-scrollbar-thumb": {
        background: colors.code.scrollbarThumb,
      },
      ".gatsby-highlight::-webkit-scrollbar-track": {
        background: colors.code.border,
        borderRadius: `0 0 ${presets.radiusLg}px ${presets.radiusLg}px`,
      },
      // Target image captions. This is kind of a fragile selector...
      ".gatsby-resp-image-link + em": {
        ...scale(-1 / 5),
        lineHeight: 1.3,
        paddingTop: rhythm(3 / 8),
        marginBottom: rhythm(options.blockMarginBottom * 2),
        display: `block`,
        textAlign: `center`,
        fontStyle: `normal`,
        color: colors.gray.calm,
        position: `relative`,
      },
      ".gatsby-resp-image-link + em a": {
        fontWeight: `normal`,
        fontFamily: options.headerFontFamily.join(`,`),
        color: colors.gatsby,
      },
      ".main-body a": {
        color: `inherit`,
        textDecoration: `none`,
        transition: `all ${presets.animation.speedFast} ${
          presets.animation.curveDefault
        }`,
        borderBottom: `1px solid ${colors.ui.bright}`,
        boxShadow: `inset 0 -2px 0px 0px ${colors.ui.bright}`,
        fontFamily: options.headerFontFamily.join(`,`),
        fontWeight: `bold`,
      },
      ".post-body a": {
        fontSize: `102%`,
        color: colors.gatsby,
      },
      ".post-body figcaption": {
        color: colors.gray.calm,
        fontFamily: headerFontFamily.join(`,`),
        fontSize: `87.5%`,
        marginTop: rhythm(1 / 2),
      },
      ".main-body a:hover": {
        background: colors.ui.bright,
      },
      ".main-body a.anchor": {
        color: `inherit`,
        fill: colors.gatsby,
        textDecoration: `none`,
        borderBottom: `none`,
        boxShadow: `none`,
      },
      ".main-body a.anchor:hover": {
        background: `none`,
      },
      ".main-body a.gatsby-resp-image-link": {
        boxShadow: `none`,
        borderBottom: `transparent`,
        marginTop: rhythm(options.blockMarginBottom * 2),
        marginBottom: rhythm(options.blockMarginBottom * 2),
      },
      ".main-body figure a.gatsby-resp-image-link": {
        boxShadow: `none`,
        borderBottom: `transparent`,
        marginTop: rhythm(options.blockMarginBottom * 2),
        marginBottom: 0,
      },
      ".main-body a.gatsby-resp-image-link:hover": {
        background: `none`,
        boxShadow: `none`,
      },
      ".gatsby-highlight, .post .gatsby-resp-iframe-wrapper, .post .gatsby-resp-image-link": {
        marginLeft: rhythm(-options.blockMarginBottom),
        marginRight: rhythm(-options.blockMarginBottom),
      },
      ".gatsby-resp-image-link": {
        borderRadius: `${presets.radius}px`,
        overflow: `hidden`,
      },
      ".gatsby-code-title": {
        background: colors.code.bg,
        border: `1px solid ${colors.code.border}`,
        borderBottomWidth: 0,
        color: colors.code.text,
        marginLeft: rhythm(-options.blockMarginBottom),
        marginRight: rhythm(-options.blockMarginBottom),
        padding: `${rhythm(options.blockMarginBottom / 2)} ${rhythm(
          options.blockMarginBottom
        )}`,
      },
      "@media (max-width:634px)": {
        ".gatsby-highlight, .gatsby-resp-image-link": {
          borderRadius: 0,
          borderLeft: 0,
          borderRight: 0,
        },
        ".gatsby-highlight": {
          boxShadow: `inset 0 1px 0 0 ${colors.code.border}, inset 0 -1px 0 0 ${
            colors.code.border
          }`,
        },
      },
      video: {
        width: `100%`,
        marginBottom: rhythm(options.blockMarginBottom),
      },
      ".twitter-tweet-rendered": {
        margin: `${rhythm(options.blockMarginBottom * 2)} auto !important`,
      },
      ".egghead-video": {
        width: `620px`,
        height: `348px`,
        border: `none`,
      },
      [MOBILE_MEDIA_QUERY]: {
        // Make baseFontSize on mobile 16px.
        html: {
          fontSize: `${(16 / 16) * 100}%`,
        },
      },
      [TABLET_MEDIA_QUERY]: {
        html: {
          fontSize: `${(17 / 16) * 100}%`,
        },
      },
      [MIN_DEFAULT_MEDIA_QUERY]: {
        ".gatsby-highlight, .post .gatsby-resp-iframe-wrapper, .post .gatsby-resp-image-link, .gatsby-code-title": {
          marginLeft: rhythm(-options.blockMarginBottom * 1.5),
          marginRight: rhythm(-options.blockMarginBottom * 1.5),
        },
        ".gatsby-highlight": {
          padding: rhythm(options.blockMarginBottom * 1.5),
          marginBottom: rhythm(options.blockMarginBottom * 1.5),
        },
        ".gatsby-highlight-code-line": {
          marginRight: `${rhythm(-options.blockMarginBottom * 1.5)}`,
          marginLeft: `${rhythm(-options.blockMarginBottom * 1.5)}`,
          paddingRight: rhythm(options.blockMarginBottom * 1.5),
          paddingLeft: `${rhythm(((options.blockMarginBottom * 1.5) / 5) * 4)}`,
          borderLeftWidth: `${rhythm(
            ((options.blockMarginBottom * 1.5) / 5) * 1
          )}`,
        },
        ".gatsby-code-title": {
          padding: `${rhythm(options.blockMarginBottom / 2)} ${rhythm(
            options.blockMarginBottom * 1.5
          )}`,
        },
      },
      [MIN_LARGER_DISPLAY_MEDIA_QUERY]: {
        html: {
          fontSize: `${(21 / 16) * 100}%`,
        },
      },
      // PrismJS syntax highlighting token styles
      // https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/
      ".token.comment, .token.block-comment, .token.prolog, .token.doctype, .token.cdata": {
        color: colors.code.comment,
      },
      ".token.punctuation": {
        color: colors.code.punctuation,
      },
      ".token.property, .token.tag, .token.boolean, .token.number, .token.function-name, .token.constant, .token.symbol": {
        color: colors.code.tag,
      },
      ".token.selector, .token.attr-name, .token.string, .token.char, .token.function, .token.builtin": {
        color: colors.code.selector,
      },
      ".token.operator, .token.entity, .token.url, .token.variable": {},
      ".token.atrule, .token.attr-value, .token.keyword, .token.class-name": {
        color: colors.code.keyword,
      },
      ".token.inserted": {
        color: colors.code.add,
      },
      ".token.deleted": {
        color: colors.code.remove,
      },
      ".token.regex, .token.important": {
        color: colors.code.regex,
      },
      ".language-css .token.string, .style .token.string": {
        color: colors.code.cssString,
      },
      ".token.important": {
        fontWeight: `normal`,
      },
      ".token.bold": {
        fontWeight: `bold`,
      },
      ".token.italic": {
        fontStyle: `italic`,
      },
      ".token.entity": {
        cursor: `help`,
      },
      ".namespace": {
        opacity: 0.7,
      },
      // PrismJS plugin styles
      ".token.tab:not(:empty):before, .token.cr:before, .token.lf:before": {
        color: colors.code.invisibles,
      },
      // Fancy external links in posts, borrowed from
      // https://github.com/comfusion/after-dark/
      // @see https://github.com/comfusion/after-dark/blob/8fdbe2f480ac40315cf0e01cece785d2b5c4b0c3/layouts/partials/critical-theme.css#L36-L39
      ".gatsby-resp-image-link + em a[href*='//']:after": {
        content: `" " url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20class='i-external'%20viewBox='0%200%2032%2032'%20width='14'%20height='14'%20fill='none'%20stroke='%23744C9E'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='9.38%'%3E%3Cpath%20d='M14%209%20L3%209%203%2029%2023%2029%2023%2018%20M18%204%20L28%204%2028%2014%20M28%204%20L14%2018'/%3E%3C/svg%3E")`,
      },
    }
  },
}

const typography = new Typography(_options)

export const { scale, rhythm, options } = typography
export default typography
