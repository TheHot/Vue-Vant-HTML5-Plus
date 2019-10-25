/**
 * 请求接口封装
 */
import { http } from '@/utils/request'

// 触手检测接口
export const chushou = (mobile) => {
  return http({
    url: '/register/submit.htm',
    method: 'POST',
    params: {
      username: mobile,
      nickname: '熟练地讲述了',
      password: mobile,
      gender: 'male',
      verifyCode: '222222',
      areaCode: '86',
      device_stoken: 'WHJMrwNw1k/FA7ZwUD5NvRH2sJI2Ugq36eqGMdo40uhn/lNzlWdul4g4zsT9TFHNi5zNiHGC4rVkLwORqdgYnXscA82AKM/a7w7gvrI9Ro6Ra0dxIW9eQKQ/GllaqVP3BvWdC0QQex8gcetWmsG70q3uZc0mcoVsv917ySgzollzEdNHiLKyjcGa3r74+Jtw0aHyzPwvxV6DQqSN07G/tn6tYoNI7Qff66lA6vu2e+EPWQcdYxf4KxQA7TV1A3gi6bDIsCvLrHOOX4JT+w5mn3XuevOYZhBE71487582755342'
    }
  })
}
