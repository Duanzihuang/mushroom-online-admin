// 不需要校验权限的urls
const noNeedValidateRightURLS = ['/login', '/index']

export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    if (!noNeedValidateRightURLS.includes(to.path)) {
      if (app.store.getters['user/getToken']) {
        next()
      } else {
        next('login')
      }
    } else {
      next()
    }
  })
}
