import typography, { options, rhythm, scale } from "../../utils/typography"
import presets, { colors } from "../../utils/presets"
import { style } from "glamor"
import hex2rgba from "hex2rgba"

const { curveDefault, speedDefault } = presets.animation

const styles = {
  featuredSitesCard: style({
    display: `flex`,
    flexDirection: `column`,
    flexGrow: 0,
    flexShrink: 0,
    width: 320,
    marginBottom: rhythm(options.blockMarginBottom * 2),
    marginRight: rhythm(3 / 4),
    [presets.Hd]: {
      width: 360,
      marginRight: rhythm(6 / 4),
    },
    [presets.VHd]: {
      width: 400,
    },
  }),
  showcaseList: {
    display: `flex`,
    flexWrap: `wrap`,
    padding: rhythm(3 / 4),
    justifyContent: `space-evenly`,
  },
  showcaseItem: {
    display: `flex`,
    flexDirection: `column`,
    margin: rhythm(3 / 4),
    minWidth: 259,//shows 3 items/row on windows > 1200px wide
    maxWidth: 350,
    flex: `1 0 0`,
    position: `relative`,
  },
  featuredItem: {
    display: `none`,
    transition: `background .3s cubic-bezier(.4,0,.2,1), transform .3s cubic-bezier(.4,0,.2,1)`,
    [presets.Desktop]: {
      alignItems: `center`,
      background: colors.accent,
      border: `none`,
      borderTopRightRadius: presets.radius,
      borderBottomLeftRadius: presets.radius,
      boxShadow: `none`,
      cursor: `pointer`,
      display: `flex`,
      height: 24,
      margin: 0,
      padding: 0,
      position: `absolute`,
      top: 0,
      right: 0,
      width: 24,
      "&:hover": {
        background: colors.gatsby,
      },
    },
  },
  featuredIcon: {
    margin: `0 auto`,
    display: `block`,
  },
  withTitleHover: style({
    "& .title": {
      transition: `box-shadow .3s cubic-bezier(.4,0,.2,1), transform .3s cubic-bezier(.4,0,.2,1)`,
      boxShadow: `inset 0 0px 0px 0px ${colors.ui.whisper}`,
    },
    "&:hover .title": {
      boxShadow: `inset 0 -3px 0px 0px ${colors.ui.bright}`,
    },
  }),
  button: {
    border: 0,
    borderRadius: presets.radius,
    cursor: `pointer`,
    fontFamily: options.headerFontFamily.join(`,`),
    fontWeight: `bold`,
    padding: `${rhythm(1 / 5)} ${rhythm(2 / 3)}`,
    WebkitFontSmoothing: `antialiased`,
    "&&": {
      backgroundColor: colors.gatsby,
      borderBottom: `none`,
      boxShadow: `none`,
      color: `white`,
      "&:hover": {
        backgroundColor: colors.gatsby,
      },
    },
  },
  loadMoreButton: {
    alignItems: `center`,
    display: `flex`,
    flexFlow: `row wrap`,
    margin: `0 auto ${rhythm(3)}`,
    padding: `${rhythm(1 / 3)} ${rhythm(3)}`,
    [presets.Desktop]: {
      margin: `0 auto ${rhythm(2 / 2)}`,
    },
  },
  sticky: {
    position: `sticky`,
    // We need the -1px here to work around a weird issue on Chrome
    // where the sticky element is consistently positioned 1px too far down,
    // leaving a nasty gap that the page content peeks through.
    // FWIW the problem is only present on the "Site Showcase" index page,
    // not the "Starter Showcase" index page; if the "Featured Sites" block
    // is removed, the problem goes away. I tried removing elements in the
    // "Featured Sites" content block, but no success—only removing the entire block
    // resolves the issue.
    top: `calc(${presets.bannerHeight} - 1px)`,
    [presets.Desktop]: {
      top: `calc(${presets.headerHeight} + ${presets.bannerHeight} - 1px)`,
    },
  },
  scrollbar: {
    WebkitOverflowScrolling: `touch`,
    "&::-webkit-scrollbar": {
      width: `6px`,
      height: `6px`,
    },
    "&::-webkit-scrollbar-thumb": {
      background: colors.ui.bright,
    },
    "&::-webkit-scrollbar-track": {
      background: colors.ui.light,
    },
  },
  screenshot: {
    borderRadius: presets.radius,
    boxShadow: `0 4px 10px ${hex2rgba(colors.gatsby, 0.1)}`,
    marginBottom: rhythm(options.blockMarginBottom / 2),
    transition: `all ${presets.animation.speedDefault} ${
      presets.animation.curveDefault
    }`,
  },
  screenshotHover: {
    background: `transparent`,
    color: colors.gatsby,
    "& .gatsby-image-wrapper": {
      transform: `translateY(-3px)`,
      boxShadow: `0 8px 20px ${hex2rgba(colors.lilac, 0.5)}`,
    },
  },
  noLinkUnderline: {
    borderBottom: `none !important`, // i know i know
    boxShadow: `none !important`, // but people really want this
  },
  meta: {
    ...scale(-1 / 5),
    alignItems: `baseline`,
    "&&": {
      color: colors.gray.bright,
    },
  },
  searchInput: {
    appearance: `none`,
    backgroundColor: `transparent`,
    border: 0,
    borderRadius: presets.radiusLg,
    color: colors.gatsby,
    paddingTop: rhythm(1 / 8),
    paddingRight: rhythm(1 / 4),
    paddingBottom: rhythm(1 / 8),
    paddingLeft: rhythm(1),
    overflow: `hidden`,
    fontFamily: typography.options.headerFontFamily.join(`,`),
    transition: `width ${speedDefault} ${curveDefault}, background-color ${speedDefault} ${curveDefault}`,
    width: `6.8rem`,
    "&::placeholder": {
      color: colors.lilac,
    },
    "&:focus": {
      outline: `none`,
      width: `9rem`,
      background: colors.ui.light,
    },
  },
}

export default styles
