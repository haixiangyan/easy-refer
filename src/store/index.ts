import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {auth, user},
  state: {
    loading: false,
  },
  mutations: {
    setLoading(state, isLoading: boolean) {
      state.loading = isLoading
    }
  }
})

export default store
