/**
 * 返回值格式化工具
 */
export const resFormatter = (data) => {
  data = data.split('|', 2)
  return {
    code: data[0],
    data: data[1]
  }
}
