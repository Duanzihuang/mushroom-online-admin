import Vue from 'vue'
import Vuex, { Store } from 'vuex'

// 导入相关模块
import user from './moduels/user'

Vue.use(Vuex)

const noNeedValidateRightURLS = ['/login', '/index']

export default () =>
  new Store({
    modules: {
      user
    },
    actions: {
      nuxtServerInit({ commit }, { app, req }) {
        const path = app.context.route.path
        if (!noNeedValidateRightURLS.includes(path)) {
          if (req.headers.cookie) {
            const cookies = req.headers.cookie.split('=')
            commit('user/setToken', cookies[1])
          } else {
            app.router.push('/login')
          }
        }
      }
    }
  })
