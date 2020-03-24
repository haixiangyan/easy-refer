export type AuthStore = {
  isLogin: boolean
}

const auth = {
  namespaced: true,
  state: {
    isLogin: true
  },
  mutations: {
    setAuth: (state: AuthStore, payload: boolean) => {
      state.isLogin = payload
    }
  }
}

export default auth
