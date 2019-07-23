const path = require('path')
const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const koaBody = require('koa-body')
const session = require('koa-session')

// 导入路由中间件
const adminRouter = require(path.join(__dirname, './router/admin.js'))
const orderRouter = require(path.join(__dirname, './router/order.js'))

const app = new Koa()

app.keys = ['some secret hurr']

const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false) */
}

app.use(session(CONFIG, app))

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // post解析及文件上传中间件
  app.use(koaBody({
    // multipart: true, // 支持文件上传
    // encoding: 'gzip',
    // formidable: {
    //   uploadDir: path.join(__dirname, 'server/upload/'), // 设置文件上传目录
    //   keepExtensions: true, // 保持文件的后缀
    //   maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
    //   onFileBegin: (name, file) => { // 文件上传前的设置
    //     // console.log(`name: ${name}`);
    //     // console.log(file);
    //   }
    // }
  }))

  // 集成路由中间件
  app.use(adminRouter.routes())
    .use(adminRouter.allowedMethods())

  app.use(orderRouter.routes())
    .use(orderRouter.allowedMethods())

  app.use((ctx) => {
    // 在将 nuxt.render 注入的时候，将 session 添加进 request 中
    // 参考：https://www.jb51.net/article/139804.htm
    ctx.req.session = ctx.session
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
