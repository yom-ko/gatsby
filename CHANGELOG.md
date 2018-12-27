# Change Log

## [2.0.0] - 2018-09-13

### Added

- Improve Gatsby's routing accessibility by integrating @reach/router (#6918) @KyleAMathews
- Add new onPreRenderHTML SSR API to manage head components in html.js (#6760) @octalmage
- Improve build speeds on larger sites (HulkSmash!) (#6226) @KyleAMathews
- Add multi-process HTML rendering support(#6417) @KyleAMathews
- Add babel-plugin-macros for custom babel config (#7129) @porfirioribeiro
- Upgrade webpack to v3, improve webpack utils (#3126) @jquense
- Add gatsby-remark-graphviz plugin to render dot (graphviz) code blocks to SVG (#7341) @Moocar
- Improve support for non-latin language content in gatsby-transformer-remark (#6992) @youngboy
- Improve support for Drupal relationships in gatsby-source-drupal (#5020) @pieh
- Add support for extra connection string params in gatsby-source-mongodb (#5972) @lcostea
- Add support for additional options supplied to gatsby-plugin-styled-components (#5240) @nihgwu
- Add guide on debugging the Gatsby build process (#6369) @pieh
- Add docs on unit testing, Cypress, react-testing-library and testing CSS-in-JS (#6678, #6708) @ascorbic, @LeKoArts
- Redesigned docs navigation and expanded docs topics (#6245, #6610) @shannonbux, @fk
- Allow plugins to override core prefetching behavior (#5320) @KyleAMathews
- Add gatsby-codemods package to assist v1 -> v2 transition (#6122) @jquense
- Add gatsby-plugin-layout package to allow use of v1 layout components in v2 (#7204) @pieh
- Add support for service worker caching of prefetched resources in gatsby-plugin-offline (#6566) @kkemple
- Add critical scripts and links to static file globs in service worker in gatsby-plugin-offline (#6316) @kkemple
- Add snapshot testing for gatsby-link (#7090) @alexandernanberg
- Introduce REPL command to gatsby-cli (#7262) @kkemple
- Add support for webpackPrefetch (#5901) @pistachiology
- Explicitly export graphql tag from Gatsby (#5415) @pieh
- Add eslint-loader and eslint configuration (#4893) @kkemple
- Improve loading graphql query results ("ludicrous mode!") (#4555) @m-allanson
- Improve error messaging when Gatsby is not installed (#7106) @KyleAMathews
- Improve modifyWebpackConfig error messaging (#7152) @m-allanson
- Add support for open tracing with zipkin (#6347) @Moocar
- Improve error messaging when plugin can't be loaded (#7023) @KyleAMathews
- Display formatted message for graphql resolver errors (#6142) @pieh
- Improve error formatting on HTML build errors (#6188) @pieh

### Fixed

- Fix out of memory error by saving state to after bootstrap is complete (#6636) @KyleAMathews
- Fix out of memory error by flattening entry values (#6797) @chuntley
- Fix code syntax formatting bug which highlighted keywords in plaintext (#7342) @tryzniak
- Remove dependency on react-lifecycles-compat (#7070) @alexandernanberg
- Prevent both preloading and inlining css in head (#6009) @thescientist13
- Fix service worker bug originating from inlining webpack-runtime (#5540) @KyleAMathews
- Fix bug producing duplicates when naming GraphQL queries (#6765) @fusepilot
- Fix typo in type annotation (#6288) @sudodoki
- Fix showing 404 page in development (#7140) @KyleAMathews
- Tighten externals matching to prevent code imports from causing build errors (#7325) @m-allanson

## [1.5.0] - 2017-07-27

### Added

- Add gatsby-source-mongodb plugin to gatsby (#1570) @jorishermans
- [www] Refactor Homepage and Navigation & convert diagram to html/css (#1605)
  @fk
- Included example with WP-API-MENUS items (#1619) @sebastienfi
- added new site to showcase (#1616) @dvzrd
- Docs: add grommet starter (#1626) @alampros
- add a bunch of tests for various plugins (#1581) @DSchau

### Fixed

- fix broken gatsby link definition for typescript 2.4.2 (#1628) @DominikGuzei
- test: fix failing test due to missing argyle image (#1636) @DSchau
- Revise part one of tutorial to use hello-world starter (#1630) @KyleAMathews
- Fix passing createNode as argument (#1629) @sebastienfi
- Don't mutate page context (#1537) @okcoker
- Updated instructions for Windows (#1621) @sebastienfi
- Tweak JSS links + add it to plugins page (#1615) @KyleAMathews

## [1.4.0] - 2017-07-25

### Added

- Add gatsby-plugin-feed to www #1569 @nicholaswyoung
- Implement gatsby-plugin-jss #1431 @wizardzloy
- gatsby-transformer-sharp: Added the option to use the original image #1556
  @chiedo

### Fixed

- [www] Blog post meta styles #1561 @fk
- Fix unsupported method in IE #1573 @variadicintegrity
- Don't set a default title in html.js as not overriden by react-helmet #1578
  @KyleAMathews
- Downgrade Glamor to v2 as v3 unstable #1580 @KyleAMathews
- Remove the slash between the pathPrefix and pathname when navigating #1574
  @DaleWebb
- Fix url in Contentful example #1596 @axe312ger
- Small fixes to tutorial #1586 @benmathews
- Add missing dep to gatsby-source-filesystem #1607 @jquense
- Wordpress -> WordPress #1608 @Alaev
- Fix typo #1609 @fk
- Update modifyWebpackConfig docs #1613 @KyleAMathews
- Fix broken links #1614 @KyleAMathews

## [1.3.0] - 2017-07-19

### Added

- docs: add "creating a static blog with gatsby" blog post #1560 @DSchau
- add tests to gatsby-remark-images #1559 @DSchau
- add glitch-gatsby-starter-blog #1554 @100ideas
- use consistent chunk ids #1534 @stevensurgnier
- Enhance API for multiple feeds #1548 @nicholaswyoung
- Add new plugin to handle csv files #1496 @ssonal
- Adds showcase segment for starters/websites built with Gatsby. #1535 @Vagr9K
- Fancy Javascript Example #1492 @jbolda
- Add sitemap plugin to www #1541 @nicholaswyoung

### Fixed

- Clone context to prevent mutations #1553 @kyleamathews
- Update dependencies to avoid hoisting errors #1552 @kyleamathews
- Set pathPrefix if not defined to an empty string to avoid undefined #1551
  @kyleamathews
- Fix prefixes in gatsby-link + navigateTo #1550 @kyleamathews
- Make path to packages the same on website as github #1549 @kyleamathews
- Fixing sw.js 404-ing because of pathPrefix not being prefixed to sw.js
  properly. Fixing #1539 #1540 @gregsqueeb
- [gatsby-plugin-sharp] Fix PNG generation when using the "duotone" option #1506
  @fk
- fix: ensure pathPrefix is added to responsive images #1510 @DSchau
- Fix the onClick override logic #1489 @jakedeichert
- Check if node.value is set as otherwise cheerio throws an error #1543
  @kyleamathews
- Fix docs referencing outdated React Router <Link> API #1523 @ahfarmer
- Fixes component-renderer to allow for use of internal routing #1542 @scottyeck
- Center .twitter-tweet-rendered #1529 @fk
- double '... use use ...' word #1528 @GoreStarry

## [1.2.0] - 2017-07-13

### Added

- Watch for changes to html.js #1473 @felixjung
- Add stylus example #1479 @iansinnott
- Added support for nested img tags in html nodes #1485 @chiedo
- Prism plugin bugfix alt #1491 @bvaughn
- Allow for env files #1462 @okcoker
- Create deploy-gatsby.md #1480 @couturecraigj

### Fixed

- Fix Contentful example URL #1483 @oscar-b
- Fix reference to program.directory #1490 @jakedeichert
- Fixes docs referencing removed "1.0" branch source code instead of master.
  #1495 @Vagr9K
- fix(gatsby-source-contentful): missing host param in createClient #1487
  @Smiter
- use program directory over cwd #1478 @craig-mulligan

## [1.1.0] - 2017-07-11

### Added

- Add gatsby-plugin-twitter for embedding Tweets #1389 @KyleAMathews
- Document promise/callback interface for async plugins #1409 @KyleAMathews
- Add an example of a config query to migration docs #1429 @benmccormick
- Adds more information to documentation pages. #1428 @Vagr9K
- Add new plugin `gatsby-plugin-emotion` #1447 @rawrmonstar
- Gatsby remark images default alt tags and optional linking #1451 @chiedo
- Add stylus support #1437 @iansinnott
- [gatsby-source-contentful] Add Support for preview api #1464 @Khaledgarbaya

### Fixed

- Update init-starter.js #1393 @kimown
- fix URL for packages, using the master branch #1399 @bmackinney
- Use latest instead of next for versions in examples #1404 @KyleAMathews
- Update www dependencies #1402 @KyleAMathews
- Fix frontpage copy issues #1401 @KyleAMathews
- Add missing return statement #1405 @ahmedlhanafy
- Fixed documentation #1406 @chiedo
- fix: Update examples directory URL due to 404 with current link #1410
  @bencodezen
- Add link to gatsby-dev-cli + we're stable + copy editing @KyleAMathews
- fix glamor + babel modification #1416 @jaredly
- Typo, grammar and standardising flags #1426 @IrregularShed
- Fix bug where the target is incorrectly set #1427 @samzhao
- Fix "gastsby" to "gatsby" on line 34 #1433 @trautlein
- Fix "Creating Pages" example's variable reference #1430 @benmccormick
- Fixes the example for navigateTo. #1440 @Vagr9K
- Properly load options for Remark #1441 @benmccormick
- Use lowercase require for "rss" #1444 @nicholaswyoung
- fix issue with ssr for redux example #1445 lemuelbarango
- Update .nvmrc, Node 8 #1446 @nicholaswyoung
- Set a key on pages so when switching between pages, the same component
  instance isn't reusued #1460 @KyleAMathews
- Removed `owner` assignation to prevent error #1454 @sebastienfi
- Update gatsby-node.js #1452 @sebastienfi
- Update README.md #1453 @sebastienfi
- Improve typescript example #1466 @fabien0102
- Remove react-helmet from src/html.js fixes #1443 #1474 @KyleAMathews
- Updates add-custom-webpack-config.md to fix broken links #1420 @marcustisater
- Fix source-wordpress npmignore #1476 @KyleAMathews

## [1.0.0] - 2017-07-06

### Added

- Adds Material Blog starter to the list of starters. #1344 @Vagr9K committed
  with KyleAMathews 4 days ago
- Continuation: WIP update home page with new design #1355 @fk
- Wordpress source plugin and example site #1321 @sebastienfi
- [v1.0] Documentation improvements. #1370 @Vagr9K
- 1.0.0 announcement blog post #1379 @KyleAMathews
- Adds gatsby-transformer-toml to the core. ##1382 @Vagr9K

### Fixed

- Update README to make it clearer about deploying to gh pages #1343 @jsfeb26
- Call next() after serving HTML #1349 @levibuzolic
- Use int for defaultValue of int field #1352 @KyleAMathews
- Make default sitemap meet expectations #1351 @chiedo
- Guard against calling ga function if it doesn't (yet) exist #1361
  @KyleAMathews
- Namespace type names for Contentful #1374 @KyleAMathews
- Add missing parens in code examples #1376 @okcoker
- Fix gatsby-transformer-react-docgen dependencies #1377 @jquense

## [1.0.0-beta.6] - 2017-07-01

### Added

- Use the sync endpoint to pull data from Contentful #1241 @Khaledgarbaya
- Use localized space #1266 @Khaledgarbaya
- gatsby-transformer-javascript-static-exports #1253 @jbolda
- Added support for HTML img tags #1285 @chiedo
- [gatsby-source-contentful] support creating localized nodes #1279
  @kyleamathews
- Link pages to their plugin creators for easier understanding/debugging fixes
  #1281 #1297 @kyleamathews
- Support NavLink in gatsby-link #1302 @abi
- Add an example for using the sass plugin #1312 @danielfarrell
- Add CSS Modules example site #1314 @kyleamathews
- Add Typescript example #1319 @kyleamathews
- Support using browserslist for setting per-site browser targeting for JS/CSS
  transformations #1336 @kyleamathews
- Add gatsby-plugin-canonical-url #1337 @kyleamathews
- [source-contentful] Allow for querying gifs & when user queries for image
  height, actually crop #1339 @kyleamathews

### Changed

- Replace build-images with just images @kyleamathews
- Make mediaType optional #1299 @kyleamathews
- Just use name/value for createNodeField #1325 @kyleamathews
- Renamed remark-responsive-image-plugin to gatsby-remark-images @chiedo
- Write images processed by sharp to public/static along with other assets #1332
  @kyleamathews

### Fixed

- using-remark fixes #1250 @fk
- Broken example commands in DOCS / Getting Started page #1252 @sebastienfi
- Don't catch links to files #1260 @kyleamathews
- Improve develop-html stage #1254 @craig-mulligan
- Make various tweaks to the tutorial #1262 @kyleamathews
- Add tests for parsing regex args + fix bug #1267 @kyleamathews
- Fixes for feed plugin README #1273 @kyleamathews
- [gatsby-source-contentful] Add testing for existing API processing #1274
  @kyleamathews
- Throw error and quit if there's a JS parse error for gatsby-config.js #1296
  @kyleamathews
- Add missing npmignore files #1298 @kyleamathews
- Move creating 404.html page into plugin so can enforce pages only created by
  plugins #1300 @kyleamathews
- Fix occasionally out-of-order query watching which would throw errors #1301
  @kyleamathews
- Waiting for query extraction wasn't actually waiting #1303 @kyleamathews
- Improved plugin error without exit #1309 @0x80
- Fixed a small typo in gatsby-plugin-postcss-sass that prevented CSS modules
  from working #1307 @levibuzolic
- Don't use the sass loader on build-javascript #1278 @danielfarrell
- Fixes 1317 Google Analytics plugin; updates attachHistory listener logic #1318
  @camsjams
- Call onRouteUpdate on initial page load #1320 @kyleamathews
- Fix check if there's a sw plugin added #1323 @kyleamathews
- Only build 1 html page in development and always serve it #1324 @kyleamathews
- Fix server/client rendering mismatch #1326 @kyleamathews
- update gatsby-remark-responsive-iframe readme #1328 @eddywashere
- Use memory lowdb as it is significantly faster. Also snuck in yurnalist for
  better console output #1329 @kyleamathews
- Quit on ctrl-c #1334 @kyleamathews
- Set keys on head/body components #1335 @kyleamathews

## [1.0.0-beta.4] - 2017-06-23

### Added

- Add using-remark example site #1230 @fk
- Add friendly webpack ouput #1240 @craig-mulligan
- Add documentation on how to use custom webpack-config #1242 @bananenmannfrau
- Add graphql fields for creating responsive images using Contentful image API
  #1228 @kyleamathews

### Changed

- Refactor Contentful data processing into own module + use more standard
  GraphQL type names @kyleamathews
- Prefer floats over integers when inferring a GraphQL field #1229 @kyleamathews

### Fixed

- Fix babel compilation so targets uglify #1244 @kyleamathews
- Open external image link with rel='noopener' #1227 @wangsongiam
- Update index.d.ts for gatsby-link #1232 @timsuchanek

## [1.0.0-beta.3] - 2017-06-21

### Added

- Show better errors when there's a graphql compilation problem #1222
  @kyleamathews
- Add google tagmanager plugin #1123 @0x80
- Support path prefixes for service workers @kyleamathews
- When a new service worker is loaded, force reload #1217 @kyleamathews
- www: Make the header fixed for tablets and up #1215 @fk
- Update on Gatsby Windows instructions #1216 @sebastienfi
- Improve GQL query error handling #1214 @0x80
- An array of linked nodes linking to heterogeneous node types is now converted
  to a union type #1211 @kyleamathews

### Fixed

- Final fixes to highlight code line whitespace, doc #1207 @fk
- Increase contentful fetch limit to max of 1000 #1209 @kyleamathews
- Fix broken links on website #1205 @kyleamathews
- Merge sidebar components #1191 @fk
- absolute resolves for gatsby config files #1195 @craig-mulligan
- Update the default sitemap query #1204 @nicholaswyoung
- For Contentful, filter out unresolvable entries and create markdown text nodes
  #1202 @kyleamathews
- Reduce font-size of the mobile menu labels #1201 @fk
- gatsby-remark-responsive-image: fix misaligned images #1196 @rstacruz
- Fix 100% width code highlight background only being drawn for the vis… #1192
  @fk

## [1.0.0-beta.2] - 2017-06-16

### Added

- Add beta 1 blog post #1183 @kyleamathews

### Fixed

- Fix prism line highlighting #1187 @kyleamathews
- Add .npmignore to source-drupal plugin so it'll publish @kyleamathews
- Fix building thumbnails when an image is processed multiple times #1185
  @kyleamathews
- Add event when all plugins are finished running so know when to start running
  queries #1182 @kyleamathews | Fix a typo on gatby-link updating #1181
  @danielfarrell

## [1.0.0-beta.1] - 2017-06-15

Our first beta!!! 🎉

### Added

- Allow for gatsby-remark-smartypants options #1166 @mitchejj
- New design (for gatsbyjs.org) + new home page #1170 @kyleamathews
- Add ability to locally define plugins #1126 @0x80
- Add rough draft for docs for creating source plugins #1159 @kyleamathews
- Optimizations around prefetching page resources #1133 @kyleamathews
- Redux example site #1081 @scottyeck
- Sitemap Generator Plugin #1115 @nicholaswyoung
- Add documentation to gatsby-remark-prism @kyleamathews

### Changed

- Move all filter operators for connections under a top-level "filter" field
  #1177 @kyleamathews
- Change `linkPrefix` to `pathPrefix` and add an example site #1155
  @kyleamathews
- Make the plugin options for remark plugins the second argument (like
  everywhere else) #1167 @kyleamathews
- Start using next instead of canary in example sites for package versions
  @kyleamathews

### Fixed

- Fix graphql compiler on typescript #949 @fabien0102
- Replace react.createClass with ES6 classes in examples html.js, add PropTypes
  #1169 @abachuk
- Fix windows build issue #1158 @kyleamathews
- Use custom delimiter when flattening example values for enum fields so easy to
  convert back @kyleamathews
- gatsby-remark-responsive-images: use span instead of div #1151 @rstacruz
- Add check that we can actually find a linked image file node @kyleamathews
- Ignore SVGs in gatsby-remark-responsive-image #1157 @fk
- Replace using levelup for caching with lowdb to avoid native dependency #1142
  @kyleamathews
- Fix Appveyor bug regarding build all examples on release #1118 @jbolda

## [1.0.0-alpha20] - 2017-06-05

### Added

- RSS Feed plugin #1073 @nicholaswyoung
- Contentful source plugin #1084 @mericsson
- MVP part 1 of new community Gatsby tutorial #1107 @kyleamathews
- Debuggin help when building HTML fails #1109 @kyleamathews
- Default `html.js` component #1107 @kyleamathews
- Can now highlight specific line numbers in markdown code blocks #1107
  @kyleamathews

## Changed

- `gatsby-config.js` is no longer required #1107 @kyleamathews
- The Gatsby `serve-build` command is now just `serve` #1107 @kyleamathews

## Fixed

- Windows builds on Appveyor #1049 @jbolda

## [1.0.0-alpha19] - 2017-06-02

(Skipping over the previous two releases as they had bugs).

### Added

- Add a helpful 404 page during development that lists the page you might have
  wanted @kyleamathews to link to or how to create a new page at that link #1051
  @kyleamathews
- Add "Plop" script for quickly creating new packages #1059 @kyleamathews
- Add new plugin supporting server rendering of Styled Components #1060 @gutenye
- Add new plugin supporting server rendering of react-helmet #1085 @kyleamathews
- Add new plugin for extracting JSDocs information from JavaScript files using
  documentation.js #1053 @kyleamathews
- Add new API spec (rough draft) @kyleamathews
  https://www.gatsbyjs.org/docs/api-specification/
- Add new API reference pages @kyleamathews e.g.
  https://www.gatsbyjs.org/docs/node-apis/
- Add "duotone" image processing option to gatsby-plugin-sharp #1047 @fk
- Add example site for image processing @fk
  https://image-processing.gatsbyjs.org/
- Add example site for css-in-js library Glamor @kyleamathews
  https://using-glamor.gatsbyjs.org/
- Add example site for css-in-js library Styled Components @kyleamathews
  https://using-styled-components.gatsbyjs.org/

### Changed

#### Grand big API renaming based on our new API spec https://www.gatsbyjs.org/docs/api-specification/

API changes:

[Action creators](https://www.gatsbyjs.org/docs/bound-action-creators/):

- `upsertPage` is now `createPage`
- `addFieldToNode` is now `createNodeField`
- `deletePageByPath` is now `deletePage`
- `addNodeToParent` is now `createParentChildLink`

[gatsby-browser.js APIs](https://www.gatsbyjs.org/docs/browser-apis/):

- `clientEntry` is now `onClientEntry`

[gatsby-node.js APIs](https://www.gatsbyjs.org/docs/node-apis/):

- `onNodeCreate` is now `onCreateNode`
- `onUpsertPage` is now `onCreatePage`
- `extendNodeType` is now `setFieldsOnGraphQLNodeType`

[gatsby-ssr.js APIs](https://www.gatsbyjs.org/docs/ssr-apis/):

- `modifyHeadComponents` and `modifyPostBodyComponents` were removed in favor of
  a new API
  [`onRenderBody`](https://www.gatsbyjs.org/docs/ssr-apis/#onRenderBody).
- `replaceServerBodyRender` is now `replaceRenderer`

### Fixed

- Fix sharp image quality and force file format #1054 @0x80
- Expose crop focus parameter and make consistent with base64 #1055 @0x80
- Clean up TravisCI config #1066 @hawkrives
- Fix inference bug #1087 @jquense
- Provide default context for GraphQL #1052 @kyleamathews
- Make determining when a given stage is finished much more reliable #1080
  @kyleamathews
- Pick values off plugin's package.json to avoid weird metadata from NPM #1090
  @kyleamathews

### New 1.0 sites launched

- https://www.vauxlab.com
- https://meetfabric.com

## [1.0.0-alpha16] - 2017-05-26

### Added

- Migration guide @kyleamathews #1032
- Made nodes fully immutable @kyleamathews #1035
- Add no-plugins example @scottyeck #1028
- Add support for "internal" plugins #1010
- Expose internal Gatsby data through GraphQL @kyleamathews #1014

### Changed

- Removed `updateNode` action creator as part of making nodes immutable in
  #1035. Now sites/plugins should use `addFieldToNode` for adding fields to
  nodes created by other plugins and `addNodeToParent` for adding a new node as
  a child to an existing node.

### Fixed

- Don't override the default onClick handler in gatsby-link @scottyeck #1019

## [1.0.0-alpha15] - 2017-05-15

### Added

- Update version of React Router to v4 #940
- API proxy for use during development #957
- "static" directory for files to be copied directly into the "public" directory
  #956
- Add `toFormat` argument to the ImageSharp GraphQL type so can change format of
  image e.g. from `png` to `jpg`.
- React Docgen transformer plugin for parsing propType info from React
  components #928

### Changed

- Change node format to hide most node-specific fields under an "internal" key.
  Any code referencing `node.type` and others will need changed to
  `node.internal.type` #960
- Changed the id for the root `<div>` used by Gatsby to mount React to
  `___gatsby`
- The default layout component should be at `layouts/index.js` not
  `layouts/default.js`
  https://github.com/gatsbyjs/gatsby/pull/940#issuecomment-300537162
- `this.props.children` in layout components is now a function
  https://github.com/gatsbyjs/gatsby/pull/940#issuecomment-300878300
- Change the default port for serve-build to 9000
- Change the path to GraphiQL to `/___graphql`

### Chore

- Upgrade Jest to v20 #935

## [1.0.0-alpha14] - 2017-05-05

### Added

- Use the Relay Modern compiler for extracting GraphQL queries from components.
  This allows us to now support components being added to _all_ components. This
  means you can now write queries next to the views that use them. #912
- Hook for modifying pages #863
- New Drupal source plugin and example site #890
- Detect if a site's plugins have changed and when they do, delete the site
  cache as it might now be invalid #927
- New way to make connections between nodes e.g. article --> author #902

### Changed

- Combine transformer and typegen plugins. The distinction between the two types
  of plugins has proved somewhat artificial so they were combined. Any typegen
  plugins in your `package.json` and `gatsby-config.js` need to be removed. #918
- Gatsby now garbage collects old nodes. Source plugins should now "touch"
- nodes that haven't changed #861
- Due to adopting the Relay compiler, GraphQL query template strings need named
  "graphql" plus must be named. So if previously you wrote:

```js
export const pageQuery = `
{
  allMarkdownMark {
    edges {
      node {
        id
      }
    }
  }
}
`
```

You must now write:

```js
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownMark {
      edges {
        node {
          id
        }
      }
    }
  }
`
```

## [1.0.0-alpha10] - 2016-11-17

### Added

- Did the intitial build of the new gatsbyjs.org! It's in the `www` subdirectory
  on the 1.0 branch and is built on each push! That's my kind of integration
  testing :-) You can see the early version of the site at
  https://gatsbyjs.netlify.com/. PRs welcome!
- Added <link preload> for page scripts. This speeds up loading scripts slightly
  by telling the browser to start downloading the scripts when the HTML first
  starts being parsed instead of when the browser reaches the end. This is
  especially helpful for large HTML documents on slow mobile networks.
  [PR](https://github.com/gatsbyjs/gatsby/pull/558)

## Changed

- Use namedmodulesplugin instead of recordsPath for ensuring deterministic
  builds and long-term cachability. The
  [previous PR adding support for recordsPath](https://github.com/gatsbyjs/gatsby/pull/533)
  proved unpleasant as you had to build locally and commit the outputted
  records.json which was confusing and annoying.
  [PR](https://github.com/gatsbyjs/gatsby/pull/559)

## [1.0.0-alpha9] - 2016-11-04

### Added

- Put the routes module on `window` to support experimental idea. See this issue
  for more](https://github.com/gatsbyjs/gatsby/issues/537).
  [commit](https://github.com/gatsbyjs/gatsby/commit/28e84f3aed480d1f5a8f9859172d1c6f531696d4)

### Changed

- Removed the package `sharp` as it's not used and is preventing Gatsby 1.0 from
  being installed on Windows.
  [commit](https://github.com/gatsbyjs/gatsby/commit/34fff74e6fb3cae88010b42f74d784382ead4031)

## [1.0.0-alpha8] - 2016-11-01

### Added

- Extension API `swOnUpdated` for when a service worker finishes updating. Use
  this to alert users of your app to reload to see the latest version.
  [commit](https://github.com/gatsbyjs/gatsby/commit/5173bdc5424e7c874b3f2abfad706cea2e38ebc3)

### Fixed

- hot reloading now fully works. Apparently you can't use function components
  for top-level routes on react-router with react-hot-loader 3.0 `¯\_( ツ )_/¯`
  [#532](https://github.com/gatsbyjs/gatsby/pull/532) and
  [commit](https://github.com/gatsbyjs/gatsby/commit/36f2c169586ea30518639d7b1493e08e05befb73)
- Webpack needs the help of an obscure setting `recordsPath` to preserve module
  ids across builds. Big thanks to @NekR for pointing this out to me. Previous
  to this change, loading changed JS chunks could cause a JS error as the module
  ids the new chunk expects wouldn't match the module ids from the older chunks.
  [#533](https://github.com/gatsbyjs/gatsby/pull/533)

### Changed

- Disabled hard-source-webpack-plugin. It speeds up builds significantly but has
  been causing hard-to-debug errors while developing. We'll circle back to it
  down the road.
  [commit](https://github.com/gatsbyjs/gatsby/commit/4bc9660ac8c371d23c0295cde52002775eee5aa1)
- Restored using ChunkManifestPlugin. It was disabled while trying to debug the
  mismatched module id bug but that being fixed, we're using it again.
  [commit](https://github.com/gatsbyjs/gatsby/commit/8d16905f31b80ca56db225904d60ed78c6091ca9)
- Name modules ids in development for easier debugging. Primary benefit is you
  can see which modules are getting hot reloaded.
  [commit](https://github.com/gatsbyjs/gatsby/commit/93f6bd2c4206e71623c1a7fa007322f8dc9887be)

## [1.0.0-alpha7] - 2016-10-27

### Fixed

- Removed entries from the webpack config looking for
  `node_modules/gatsby/node_modules`. This was added to help when developing
  Gatsby using `npm link` but when Gatsby is installed regularly, it then fails
  the Webpack validation as `node_modules/gatsby/node_modules` doesn't now
  exist.

## [1.0.0-alpha6] - 2016-10-27

### Added

- extension API for adding types to the GraphQL schema
  [commit](https://github.com/gatsbyjs/gatsby/commit/18b8b64ed4cbe3399fb262395c0c6e6a5a16099a)

### Fixed

- Use babel-traverse instead of using babel-plugin so that don't say done early
  when running graphql queries that have async resolvers
  [commit](https://github.com/gatsbyjs/gatsby/commit/a19677e38d1ce8ba4fb39ddff75482904f168db6)

## [1.0.0-alpha5] - 2016-10-14

### Added

- hard-source-webpack-plugin
  [commit](https://github.com/gatsbyjs/gatsby/commit/2c48e5c42887fecabc01c5f5b6f3dd8e06d3372f)
- New replacement API to wrap root component (useful for Redux, et al.)
  [commit](https://github.com/gatsbyjs/gatsby/commit/ebd57d2bd6c39b51a455b76018737e2957e146ef)
- yarn.lock
  [commit](https://github.com/gatsbyjs/gatsby/commit/5ce3321b84e912925c4705ececef6f2c817b0684)

### Changed

- Disable extracting the Webpack chunk manifest until understand why this breaks
  updates when using Service Workers
  [commit](https://github.com/gatsbyjs/gatsby/commit/07ed5b010ad27b1816084b361f06fd0ae6a017ba)

## [1.0.0-alpha4] - 2016-10-07

### Added

- Add more file extensions to file/url loader config. Default to url loader
  unless it never makes sense to use data-uri e.g. favicons.
- Use api-runner-browser for calling browser extension APIs/replacements. Prep
  for plugin system.
- Add extension API `clientEntry` that let's site code and plugins to run code
  at the very start of client app.

### Changed

- Add config to uglify to ignore ie8.
- Disable building AppCache until can research if useful.
- Turn on screw_ie8 options in UglifyJS.

### Fixed

- Actually use the "sources" key from gatsby-config.js for looking for markdown
  files. This will be getting an overhaul soon.
- Don't use null-loader for css during the build-js stage as this prevents
  offline-plugin from caching files referenced in your CSS.
- Add missing publicPath for build-html step.

## [1.0.0-alpha3] - 2016-10-05

### Added

- Introduce way to programmatically add components to `<head>` + API to take
  over SSR rendering
  [a39c2a5](https://github.com/gatsbyjs/gatsby/commit/a39c2a5)
- Extract webpack manifest from commons.js so it doesn't change on every build
  improving its cachability
  [0941d33](https://github.com/gatsbyjs/gatsby/commit/0941d33)
- Always add babel-plugin-add-module-exports
  [97f083d](https://github.com/gatsbyjs/gatsby/commit/97f083d)

### Changed

- Upgraded React Hot Loader to 3.0-beta5
  [5185c3a](https://github.com/gatsbyjs/gatsby/commit/5185c3a)

### Fixed

- Ensure bundle names for components and paths are unique
  [342030d](https://github.com/gatsbyjs/gatsby/commit/342030d)
  [a1dfe19](https://github.com/gatsbyjs/gatsby/commit/a1dfe19)
- Remove old code loading config.toml
  [66f901](https://github.com/gatsbyjs/gatsby/commit/66f901)

## [1.0.0-alpha2] - 2016-09-21

### Added

- New system for specifying page layouts inspired by Jekyll.
- `<HTMLScripts />` and `<HTMLStyles />` helper components for rendering correct
  scripts and styles in your html.js,
- Validate at runtime gatsby-config.js and page objects.
- Start of new plugin system.
- New extension API: `onPostCreatePages` — called with pages after all pages are
  created. Useful for programmatically modifying pages created in plugins.

### Changed

- Removed remaining 0.x code
- Exit if can't find local install of Gatsby.
  [030f655](https://github.com/gatsbyjs/gatsby/commit/030f655075be5ad91af1dc12a05e6bd153a861df)
- Fix folder hierarchy for looking for loaders and modules #435
- Changed default `Config` GraphQL type to `Site` and added some Jekyll-inspired
  fields.

## [1.0.0-alpha1] - 2016-09-02

### Added

- Initial versions of new GraphQL data layer, PRPL pattern, programmatic routes,
  code splitting, supporting long-term caching of JS files.
