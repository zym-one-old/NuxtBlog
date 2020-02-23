
const fs = require('fs')
const consola = require('consola')

function delDir (path) {
  let files = []
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path)
    files.forEach((file, index) => {
      const curPath = path + '/' + file
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath) // 递归删除文件夹
      } else {
        fs.unlinkSync(curPath) // 删除文件
        consola.info('unlink:' + curPath)
      }
    })
    fs.rmdirSync(path)
    consola.info('rmdirSync:' + path)
  }
}

module.exports = delDir
