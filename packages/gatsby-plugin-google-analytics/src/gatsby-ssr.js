import React from "react"

const knownOptions = {
  clientId: `string`,
  sampleRate: `number`,
  siteSpeedSampleRate: `number`,
  alwaysSendReferrer: `boolean`,
  allowAnchor: `boolean`,
  cookieName: `string`,
  cookieExpires: `number`,
  storeGac: `boolean`,
  legacyCookieDomain: `string`,
  legacyHistoryImport: `boolean`,
  allowLinker: `boolean`,
}

exports.onRenderBody = (
  { setHeadComponents, setPostBodyComponents },
  pluginOptions
) => {
  if (process.env.NODE_ENV === `production`) {
    let excludeGAPaths = []
    if (typeof pluginOptions.exclude !== `undefined`) {
      const Minimatch = require(`minimatch`).Minimatch
      pluginOptions.exclude.map(exclude => {
        const mm = new Minimatch(exclude)
        excludeGAPaths.push(mm.makeRe())
      })
    }

    const gaCreateOptions = {}
    for (const option in knownOptions) {
      if (typeof pluginOptions[option] === knownOptions[option]) {
        gaCreateOptions[option] = pluginOptions[option]
      }
    }

    const setComponents = pluginOptions.head
      ? setHeadComponents
      : setPostBodyComponents
    return setComponents([
      <script
        key={`gatsby-plugin-google-analytics`}
        dangerouslySetInnerHTML={{
          __html: `
  ${
    excludeGAPaths.length
      ? `window.excludeGAPaths=[${excludeGAPaths.join(`,`)}];`
      : ``
  }
  ${
    typeof pluginOptions.anonymize !== `undefined` &&
    pluginOptions.anonymize === true
      ? `function gaOptout(){document.cookie=disableStr+'=true; expires=Thu, 31 Dec 2099 23:59:59 UTC;path=/',window[disableStr]=!0}var gaProperty='${
          pluginOptions.trackingId
        }',disableStr='ga-disable-'+gaProperty;document.cookie.indexOf(disableStr+'=true')>-1&&(window[disableStr]=!0);`
      : ``
  }
  if(${
    typeof pluginOptions.respectDNT !== `undefined` &&
    pluginOptions.respectDNT == true
      ? `!(navigator.doNotTrack == "1" || window.doNotTrack == "1")`
      : `true`
  }) {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  }
  if (typeof ga === "function") {
    ga('create', '${pluginOptions.trackingId}', '${
            typeof pluginOptions.cookieDomain === `string`
              ? pluginOptions.cookieDomain
              : `auto`
          }', ${
            typeof pluginOptions.name === `string`
              ? `'${pluginOptions.name}', `
              : ``
          }${JSON.stringify(gaCreateOptions)});
      ${
        typeof pluginOptions.anonymize !== `undefined` &&
        pluginOptions.anonymize === true
          ? `ga('set', 'anonymizeIp', true);`
          : ``
      }
      ${
        typeof pluginOptions.optimizeId !== `undefined`
          ? `ga('require', '${pluginOptions.optimizeId}');`
          : ``
      }}
      `,
        }}
      />,
    ])
  }

  return null
}
