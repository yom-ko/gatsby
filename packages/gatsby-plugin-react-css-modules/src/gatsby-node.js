exports.onCreateBabelConfig = ({ actions }, pluginOptions) => {
  actions.setBabelPlugin({
    name: `babel-plugin-react-css-modules`,
    options: {
      generateScopedName: `[name]--[local]--[hash:base64:5]`,
      webpackHotModuleReloading: process.env.NODE_ENV !== `production`,
      ...pluginOptions,
    },
  })
}
