const Router = require('koa-router')
const {
  getMenu,
  getFile,
  updateRepo,
  getResume
} = require('../controllers/docs')

const {
  getProjects
} = require('../controllers/projects')

const router = new Router()
router.get('/api/getMenu', getMenu)
router.post('/api/getFile', getFile)
router.get('/api/getResume', getResume)
router.post('/api/updateRepo', updateRepo)

router.get('/api/getProjects', getProjects)

// export default router
module.exports = router
