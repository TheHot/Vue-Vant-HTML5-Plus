/**
 * 信盒请求接口
 */
import { xinhe } from '@/utils/request'

export const logIn = ({ username, password }) => {
  return xinhe({
    params: {
      action: 'loginIn',
      name: username,
      password: password
    }
  })
}

export const getSummary = () => {
  return xinhe({
    params: {
      action: 'getSummary'
    }
  })
}

export const getPhone = () => {
  return xinhe({
    params: {
      action: 'getPhone'
    }
  })
}

// 拉黑手机号接口
// 拉黑之后还能指定获取
export const addBlacklist = (mobile) => {
  return xinhe({
    params: {
      action: 'addBlacklist',
      phone: mobile
    }
  })
}

// 释放手机号接口
export const cancelRecv = (mobile) => {
  return xinhe({
    params: {
      action: 'cancelRecv',
      phone: mobile
    }
  })
}
