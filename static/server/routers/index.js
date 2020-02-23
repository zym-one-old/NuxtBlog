const Router = require('koa-router')
const { getMenu, getFile, updateRepo, getResume } = require('../controllers/docs')

const router = new Router()
router.get('/api/getMenu', getMenu)
router.post('/api/getFile', getFile)
router.get('/api/getResume', getResume)
router.post('/api/updateRepo', updateRepo)

// export default router
module.exports = router
