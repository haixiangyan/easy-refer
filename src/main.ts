import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import { createProvider } from './vue-apollo'
import './plugins/element'
import './registerServiceWorker'

// 基础样式
import './assets/styles/global.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
