import {namespace} from 'vuex-class'

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

export const AUTH_MODULE = namespace('auth')

export default auth
