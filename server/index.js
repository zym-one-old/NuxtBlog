const { join } = require('path')
const fs = require('fs')
const Koa = require('koa')
const { Nuxt, Builder } = require('nuxt')
const Router = require('koa-router')
const koaBody = require('koa-body')
const cors = require('@koa/cors')
const consola = require('consola')
const degit = require('degit') // makes copies of git repositories
const route = require('./routers')

// Import and Set Nuxt.js options
async function start () {
  // 更新文档
  const docsDir = join(__dirname, 'docs')
  const repo = 'yiming-zeng/docs'

  if (!fs.existsSync(docsDir)) {
    await degit(repo, { force: true, cache: false }).clone(docsDir)
  }

  const app = new Koa()
  const config = require('../nuxt.config.js')
  config.dev = app.env !== 'production'
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // consola.info(process.env.PORT)
  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  await nuxt.ready()
  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.context.docsDir = docsDir
  app.context.repo = repo

  app.use(cors())
  app.use(koaBody())

  const router = new Router()
  router.use('', route.routes())
  app.use(router.routes()).use(router.allowedMethods())

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
