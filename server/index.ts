import express from 'express'
import consola from 'consola'
import history from 'connect-history-api-fallback'
// 路由
import JobsRoute from './routes/jobs'

// Import and Set Nuxt.js options
const config = require('../nuxt.config')
const {Nuxt, Builder} = require('nuxt')

config.dev = process.env.NODE_ENV !== 'production'

const app = express()

app.use(history())
app.use('/jobs', JobsRoute)

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
