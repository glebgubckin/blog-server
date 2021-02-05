const Router = require('express')
const router = new Router()
const subscribtionController = require('../controllers/subcribtionController')

router.get('/', subscribtionController.get)
router.post('/', subscribtionController.create)

module.exports = router
