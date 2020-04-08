import axios from 'axios'
import {Message} from 'element-ui'
import {HTTP_CODE_MAPPER} from '@/constants/http'

const service = axios.create({})

service.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  Message.error(error.message)

  return Promise.reject(error);
});

service.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  Message.error(HTTP_CODE_MAPPER[error.response.status] || '出错啦')

  return Promise.reject(error);
});

export default service