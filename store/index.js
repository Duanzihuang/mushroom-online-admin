import Vue from 'vue'
import Vuex, { Store } from 'vuex'

// 导入相关模块
import user from './moduels/user'

Vue.use(Vuex)

// const noNeedValidateRightURLS = ['/login', '/index']

export default () =>
  new Store({
    modules: {
      user
    },
    actions: {
      nuxtServerInit({ commit }, { req }) {
        if (req.session && req.session.token) {
          commit('user/setToken', req.session.token)
          commit('user/setUser', req.session.user)
        }
      }
    }
  })
