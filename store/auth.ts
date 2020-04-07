import {namespace} from 'vuex-class'

export const AUTH_MODULE = namespace('auth')

export const state = (): TAuthState  => ({
  isLogin: false
})

export const mutations = {
  setAuth: (state: TAuthState, payload: boolean) => {
    state.isLogin = payload
  }
}

