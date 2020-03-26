type TAuthStore = {
  isLogin: boolean
}

const auth = {
  namespaced: true,
  state: {
    isLogin: false
  },
  mutations: {
    setAuth: (state: TAuthStore, payload: boolean) => {
      state.isLogin = payload
    }
  }
}

export default auth
