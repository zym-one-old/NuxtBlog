const { promisify } = require('util')
const fs = require('fs')
const { resolve } = require('path')
const readFile = promisify(fs.readFile)

const getProjects = async (ctx, next) => {
  const fileContent = await readFile(
    resolve(ctx.docsDir, 'projects.json'),
    'utf-8'
  )
  const menu = JSON.parse(fileContent)
  return (ctx.body = {
    ret: 200,
    msg: 'success',
    data: menu
  })
}

module.exports = {
  getProjects
}
