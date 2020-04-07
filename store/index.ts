import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
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
