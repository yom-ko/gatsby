import React, { Component, Fragment } from "react"
import PluginSearchBar from "./plugin-searchbar-body"
import { rhythm } from "../utils/typography"
import presets, { colors } from "../utils/presets"
import { scrollbarStyles } from "../utils/styles"

class PageWithPluginSearchBar extends Component {
  render() {
    return (
      <Fragment>
        <div
          css={{
            ...styles.sidebar,
            // mobile: hide PluginSearchBar when on gatsbyjs.org/packages/foo, aka package README page
            display: `${!this.props.isPluginsIndex && `none`}`,
          }}
        >
          <PluginSearchBar location={this.props.location} />
        </div>
        <div
          css={{
            ...styles.content,
            // mobile: hide README on gatsbyjs.org/plugins index page
            display: `${this.props.isPluginsIndex && `none`}`,
          }}
        >
          {this.props.children}
        </div>
      </Fragment>
    )
  }
}

export default PageWithPluginSearchBar

const widthDefault = rhythm(14)
const widthLarge = rhythm(16)

const styles = {
  sidebar: {
    height: `calc(100vh - ${presets.headerHeight})`,
    width: `100vw`,
    zIndex: 1,
    top: `calc(${presets.headerHeight} + ${presets.bannerHeight} - 1px)`,
    ...scrollbarStyles,
    [presets.Tablet]: {
      display: `block`,
      width: widthDefault,
      position: `fixed`,
      background: colors.ui.whisper,
      borderRight: `1px solid ${colors.ui.light}`,
    },
    [presets.Desktop]: {
      width: widthLarge,
    },
  },
  content: {
    [presets.Tablet]: {
      display: `block`,
      paddingLeft: widthDefault,
    },
    [presets.Desktop]: {
      paddingLeft: widthLarge,
    },
  },
}
