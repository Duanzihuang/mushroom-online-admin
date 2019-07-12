const path = require('path')
const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const koaBody = require('koa-body')

// 导入路由中间件
const adminRouter = require(path.join(__dirname, './router/admin.js'))

const app = new Koa()

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
