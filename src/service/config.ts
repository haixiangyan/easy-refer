import axios from 'axios'
import {Message} from 'element-ui'
import store from '@/store'
import {HTTP_CODE_MAPPER} from '@/constants/http'

axios.interceptors.request.use(function (config) {
  !store.state.loading && store.commit('setLoading', true)

  return config;
}, function (error) {
  store.state.loading && store.commit('setLoading', false)

  Message.error(error.message)

  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  store.state.loading && store.commit('setLoading',  false)

  return response;
}, function (error) {
  store.state.loading && store.commit('setLoading', false)

  Message.error(HTTP_CODE_MAPPER[error.response.status] || '出错啦')

  return Promise.reject(error);
});

export default axios
