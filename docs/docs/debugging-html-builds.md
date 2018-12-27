---
title: Debugging HTML Builds
---

Errors while building static HTML files generally happen for one of the following reasons:

1.  Some of your code references "browser globals" like `window` or `document`. If
    this is your problem you should see an error above like "window is not
    defined". To fix this, find the offending code and either a) check before
    calling the code if window is defined so the code doesn't run while Gatsby is
    building (see code sample below) or b) if the code is in the render function
    of a React.js component, move that code into `componentDidMount` which
    ensures the code doesn't run unless it's in the browser.

1.  Check that each of your JS files listed in your `pages` directory (and any
    sub-directories) are exporting either a React component or string. Gatsby
    treats any JS file listed under the `pages` dir as a page component, so it must
    have a default export that's a component or string.

1.  You mix up `import` and `require` calls in the same file. This might lead to
    "WebpackError: Invariant Violation: Minified React error #130" [since Webpack 4
    is stricter than v3](/docs/migrating-from-v1-to-v2/#convert-to-either-pure-commonjs-or-pure-es6).
    The solution is to only use `import`.

1.  Some other reason :-) #1 is the most common reason building static files
    fail. If it's another reason, you have to be a bit more creative in figuring
    out the problem.

## How to check if `window` is defined

```javascript
// Requiring function causes error during builds
// as the code tries to reference window
const module = require("module") // Error

// Wrap the require in check for window
if (typeof window !== `undefined`) {
  const module = require("module")
}
```

## Fixing third-party modules

So, the worst has happened and you're using an NPM module that expects `window`
to be defined. You may be able to file an issue and get the module patched, but
what to do in the mean time?

One solution is to [customize](/docs/add-custom-webpack-config) your webpack
configuration to replace the offending module with a dummy module during server
rendering.

`gatsby-node.js` in the project root:

```js:title=gatsby-node.js
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /bad-module/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
```
