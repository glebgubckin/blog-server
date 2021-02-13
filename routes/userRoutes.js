const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/AuthMiddleware')

router.post('/login', userController.login)
router.post('/registration', userController.registration)
router.put('/update/:id', userController.update)
router.get('/auth', authMiddleware, userController.check)

module.exports = router
