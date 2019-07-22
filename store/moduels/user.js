export default {
  namespaced: true,
  state: {
    token: null,
    user: null
  },
  getters: {
    getToken(state) {
      return state.token
    },
    getUser(state) {
      return state.user
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUser(state, user) {
      state.user = user
    }
  }
}
