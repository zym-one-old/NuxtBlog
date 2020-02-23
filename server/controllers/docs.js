const { promisify } = require('util')
const fs = require('fs')
const { resolve } = require('path')
const consola = require('consola')
const fm = require('front-matter')
// const glob = promisify(require('glob'))
const readFile = promisify(fs.readFile)
const degit = require('degit') // makes copies of git repositories
const delDir = require('../utils/delDir')
const { marked } = require('../utils/renderer')

// export const getMenu = async (ctx, next) => {
//   const menuPaths = await glob('*/*.md', {
//     cwd: ctx.docsDir + '/posts',
//     ignore: 'node_modules/**/*',
//     nodir: true
//   })
//   const menu = {}
//   const folder = fs.readdirSync(ctx.docsDir + '/posts')
//   folder.map((fn) => {
//     menu[fn] = []
//   })

//   await Promise.all(menuPaths.map((path) => {
//     const lastKey = path.split('/')[0]
//     const fileName = path.split('/')[1].replace('.md', '')
//     // folder/20130102_xxxx.md
//     if (fileName.indexOf('_') > 0) {
//       menu[lastKey].push({
//         date: fileName.split('_')[0],
//         name: fileName.split('_')[1]
//       })
//     }
//   }))
//   return (ctx.body = {
//     ret: 200,
//     msg: 'success',
//     data: {
//       folder,
//       menu
//     }
//   })
// }

const updateRepo = async (ctx, next) => {
  if (fs.existsSync(ctx.docsDir)) {
    delDir(ctx.docsDir)
    consola.info(`Docdir ${ctx.docsDir} Deleted`)
  }

  consola.info(`Cloning ${ctx.repo} into ${ctx.docsDir}`)
  await degit(ctx.repo, { force: true, cache: false }).clone(ctx.docsDir)

  return (ctx.body = {
    ret: 200,
    msg: 'repo updated!'
  })
}

const getResume = async (ctx, next) => {
  const fileContent = await readFile(resolve(ctx.docsDir, 'resume.json'), 'utf-8')
  const resume = JSON.parse(fileContent)

  return (ctx.body = {
    ret: 200,
    msg: 'success',
    data: resume
  })
}

const getMenu = async (ctx, next) => {
  const fileContent = await readFile(resolve(ctx.docsDir, 'posts/menu.json'), 'utf-8')
  const menu = JSON.parse(fileContent)
  return (ctx.body = {
    ret: 200,
    msg: 'success',
    data: menu
  })
}

const getFile = async (ctx, next) => {
  const { path } = ctx.request.body
  // Read file
  let file = await readFile(resolve(ctx.docsDir, path), 'utf-8')
  // Transform markdown to html
  file = fm(file)
  return (ctx.body = {
    ret: 200,
    msg: 'success',
    data: {
      attrs: file.attributes,
      body: marked(file.body)
    }
  })
}

module.exports = {
  getMenu, getFile, updateRepo, getResume
}
