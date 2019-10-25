/**
 * 封装 api 接口
 */
import Axios from 'axios'
import { getItem } from '@/utils/localstorage'

export const http = Axios.create({
  baseURL: 'https://chushou.tv'
})

export const xinhe = Axios.create({
  baseURL: 'http://api.xinheyz.com/api/do.php'
})

// 添加拦截器，增加所有请求中的 Token 字段
xinhe.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (config.params.action === 'loginIn') {
    return config
  }
  config.params['token'] = getItem('x-token').data
  config.params['sid'] = '1040'
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
