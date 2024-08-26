const Router = require('express')
const router = new Router()
const controlleer = require('./authController')
const { check } = require('express-validator')

router.post('/registration',[
    check('username', 'The login cannot be empty').notEmpty(),
    check('name', 'The name cannot be empty').notEmpty(),
    check('password', 'The password must be more than 6 characters').isLength({min: 6})
], controlleer.registration)
router.post('/login', controlleer.login)

module.exports = router