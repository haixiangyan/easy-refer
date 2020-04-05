import {namespace} from 'vuex-class'

const initState: TAuthState = {
  isLogin: false
}

const auth = {
  namespaced: true,
  state: initState,
  mutations: {
    setAuth: (state: TAuthState, payload: boolean) => {
      state.isLogin = payload
    }
  }
}

export const AUTH_MODULE = namespace('auth')

export default auth
