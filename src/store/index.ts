import Vue from 'vue'
import Vuex from 'vuex'

import auth, {AuthStore} from './modules/auth'

Vue.use(Vuex)

type GlobalStore = {
  state: {
    auth: AuthStore
  }
}

const store: GlobalStore = new Vuex.Store({
  modules: {
    auth
  }
})

export default store
