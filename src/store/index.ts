import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {auth, user},
  state: {
    loading: false,
    loadingText: '加载中',
  },
  mutations: {
    setLoading(state, isLoading: boolean, loadingText = '加载中') {
      state.loading = isLoading
      state.loadingText = loadingText
    }
  }
})

export default store
