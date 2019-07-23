const path = require('path')
const Router = require('koa-router')
const db = require(path.join(__dirname, '../db/index.js'))

const courseRouter = new Router({
  prefix: '/admin'
})

/**
 * 分页查询课程列表
 */
courseRouter.get('/course/list', async (ctx) => {
  const { pageIndex = 1, pageSize = 5, keyword = '' } = ctx.request.query

  const startIndex = (parseInt(pageIndex) - 1) * parseInt(pageSize)

  const result1 = await db.executeSql('select * from t_course where title like ? limit ?,?', [`%${keyword}%`, startIndex, parseInt(pageSize)])

  const result2 = await db.executeSql('select count(*) as total from t_course where title like ? ', [`%${keyword}%`])

  ctx.body = {
    status: 0,
    message: result1,
    total: result2[0].total
  }
})

module.exports = courseRouter
