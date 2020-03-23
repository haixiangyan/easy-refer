import Vue from 'vue'
import ViewUI from 'view-design';
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// 基础样式
import './assets/styles/global.scss'
import 'view-design/dist/styles/iview.css'

// 测试使用 mockjs
if (process.env.NODE_ENV === 'development') {
  require('./mock/')
}

Vue.config.productionTip = false

Vue.use(ViewUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
