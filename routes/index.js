const Router = require('express')
const router = new Router()
const userRoutes = require('./userRoutes')
const articleRoutes = require('./articleRoutes')
const subscribtionRoutes = require('./subscribtionRoutes')

router.use('/user', userRoutes)
router.use('/article', articleRoutes)
router.use('/subscribtion', subscribtionRoutes)  

module.exports = router
