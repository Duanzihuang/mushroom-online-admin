const path = require('path')
const Router = require('koa-router')
const db = require(path.join(__dirname, '../db/index.js'))

const orderRouter = new Router({
  prefix: '/admin'
})

/**
 * 分页查询订单列表
 */
orderRouter.get('/order/list', async (ctx, next) => {
  let { pageIndex = 1, pageSize = 10, keyword = '' } = ctx.request.query

  startIndex = parseInt(pageIndex - 1) * parseInt(pageSize)
  pageSize = parseInt(pageSize)

  // const result1 = await db.executeSql(
  //   'select o.id,o.order_number,o.course_id,o.price,o.pay_type,o.pay_status,o.create_time,u.nickname from t_order o inner join t_user u on o.user_id = u.id  where o.status = 1 and u.nickname like ? limit ?,?',
  //   [`%${keyword}%`, startIndex, pageSize]
  // )
  const result1 = await db.executeSql(
    'select r1.*,c.title from (select o.id,o.order_number,o.course_id,o.price,o.pay_type,o.pay_status,o.create_time,u.nickname from t_order o inner join t_user u on o.user_id = u.id  and o.status = 1 and u.nickname like ? limit ?,?) as r1 INNER JOIN t_course c on r1.course_id = c.id ',
    [`%${keyword}%`, startIndex, pageSize]
  )

  const result2 = await db.executeSql(
    'select count(*) as total from t_order o inner join t_user u on o.user_id = u.id  where o.status = 1 and u.nickname like ?',
    [`%${keyword}%`]
  )

  ctx.body = {
    status: 0,
    total: result2[0].total,
    message: result1
  }
})

module.exports = orderRouter
