const Router = require('express')
const router = new Router()
const controlleer = require('./infoController')

router.post('/check', controlleer.checkUserId)

module.exports = router