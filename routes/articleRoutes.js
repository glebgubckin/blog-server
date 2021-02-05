const Router = require('express')
const router = new Router()
const articleController = require('../controllers/articleController')
const checkRole = require('../middleware/chechRoleMiddleware')

router.get('/', articleController.getAll)
router.get('/:id', articleController.getOne)
router.post('/', checkRole('admin'), articleController.create)
router.delete('/', checkRole('admin'), articleController.delete)

module.exports = router
