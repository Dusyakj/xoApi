const Router = require('express')
const router = new Router()
const controlleer = require('./gameController')

router.post('/create-game', controlleer.startGame)

module.exports = router