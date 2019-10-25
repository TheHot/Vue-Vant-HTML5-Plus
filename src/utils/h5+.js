/**
 * 封装 h5+ api 函数
 */

export function onPlusReady (data) {
  // 获取根目录文件系统
  plus.io.resolveLocalFileSystemURL('/sdcard', function (entry) {
    // 检测是否存在 TheHot 文件夹,不存在则创建
    entry.getDirectory('TheHot', { create: true }, function (dir) {
      dir.getFile('触手已检测.txt', { create: true }, function (file) {
        // 对获取到的文件对象创建写文件对象
        file.createWriter(function (writer) {
          // 定位写入位置，writer.length -1 为文件末尾
          writer.seek(writer.length - 1)
          // 写入数据，不知道为什么，安卓上需要先回车再空格才行，\r\n 没有效果
          writer.write(data + '\n\r')
        }, function (e) {
          alert(e.message)
        })
      }, function (e) {
        alert('创建文件失败！' + e.message)
      })
    }, function (e) {
      alert('创建文件夹失败！' + e.message)
    })
  }, function (e) {
    alert('未找到sdcard根目录！' + e.message)
  })
}

export function showToast (message) {
  plus.nativeUI.toast(message)
}
