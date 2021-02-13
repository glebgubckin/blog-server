const Router = require('express')
const router = new Router()
const articleController = require('../controllers/articleController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', articleController.getAll)
router.get('/:id', articleController.getOne)
router.post('/', checkRole('admin'), articleController.create)
router.put('/:id', checkRole('admin'), articleController.update)
router.delete('/:id', checkRole('admin'), articleController.delete)

module.exports = router
