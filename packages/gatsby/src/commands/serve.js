/* @flow weak */
const openurl = require(`opn`)
const signalExit = require(`signal-exit`)
const compression = require(`compression`)
const express = require(`express`)

module.exports = program => {
  let { port, open } = program
  port = typeof port === `string` ? parseInt(port, 10) : port

  const app = express()
  app.use(compression())
  app.use(express.static(`public`))
  app.use((req, res, next) => {
    if (req.accepts(`html`)) {
      res.status(404).sendFile(`404.html`, { root: `public` })
    } else {
      next()
    }
  })

  const server = app.listen(port, () => {
    let openUrlString = `http://localhost:` + port
    console.log(`gatsby serve running at:`, openUrlString)
    if (open) {
      let openUrlString = `http://localhost:` + port
      console.log(`Opening browser...`)
      openurl(openUrlString)
    }
  })

  signalExit((code, signal) => {
    server.close()
  })
}
