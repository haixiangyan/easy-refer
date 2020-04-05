import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import './plugins/element'
import './registerServiceWorker'

// 基础样式
import './assets/styles/global.scss'

// 引入 mock
if (process.env.NODE_ENV === 'development') {
  require('@/mocks')
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
