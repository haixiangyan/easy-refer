import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import user from './modules/user'
import job from './modules/job'
import resume from './modules/resume'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {auth, user, job, resume},
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
