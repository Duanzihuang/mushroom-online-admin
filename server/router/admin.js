const path = require('path')
const Router = require('koa-router')
const jwt = require('jsonwebtoken')
const config = require(path.join(__dirname, '../../utils/config.js'))
const db = require(path.join(__dirname, '../db/index.js'))

const adminRouter = new Router({
  prefix: '/admin'
})

/**
 * 登录
 */
adminRouter.post('/user/login', async (ctx, next) => {
  const { username, password } = ctx.request.body

  const result = await db.executeSql(
    'select * from t_admin where username = ? and password = ?',
    [username, password]
  )

  if (result.length === 0) {
    ctx.body = {
      status: 1,
      message: '用户名或密码错误'
    }
  } else {
    const user = result[0]

    const token = jwt.sign({ uid: user.id }, config.tokenSecret, {
      expiresIn: config.tokenExpiresIn
    })

    // 设置登录用户信息到session中
    ctx.session.token = token
    ctx.session.user = { uid: user.id }

    ctx.body = {
      status: 0,
      token,
      user: { uid: user.id },
      message: '登录成功'
    }
  }
})

/**
 * 登出
 */
adminRouter.get('/user/logout', (ctx, next) => {
  delete ctx.session.token
  delete ctx.session.user

  ctx.body = {
    status: 0,
    message: '退出登录成功'
  }
})

module.exports = adminRouter
