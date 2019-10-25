/**
 * 封装本地存储方法
 */
const myStorage = window.localStorage

// 设置本地存储内容
export const setItem = (key, value) => {
  // json 存储值
  myStorage.setItem(key, JSON.stringify(value))
}

// 获取本地存储值
export const getItem = (key) => {
  // 解析 json 值并返回
  return JSON.parse(myStorage.getItem(key))
}

// 删除本地存储 key 值
export const rmItem = (key) => {
  // 删除单个 key 属性值
  myStorage.clear(key)
}
