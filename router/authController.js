const Users = require('../models/Users')
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator')

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.json({message: "registration errors",errors})
            }
            const {username, password, name} = req.body
            const condidate = await Users.find({username})
            if (condidate.length == 1) {
                return res.json({message: 'User with this login already registered'})
            }
            const hashPassword = bcrypt.hashSync(password,5)
            const user = await new Users({username, password: hashPassword, name, roles: ['USER']})
            await user.save()
            res.json({message: 'User is registered'})

        } catch (error) {
            console.log(error)
            res.json({message: 'reg error'})
        }    
    }
    async login(req, res) {
        try {
            const {username, password} = req.body
            console.log(username, await Users.find())
            const user = await Users.find({username})
            if (user.length == 0) {
                return res.json({message: "User with this login not found"})
            }
            const validPassword = bcrypt.compareSync(password,user[0].password)
            if (!validPassword) {
                return res.json({message: "Incorrect password"})
            }
            res.send({message: 'Success',id: user[0]._id, name: user[0].name})
            
        } catch (error) {
            console.log(error)
            res.json({message: 'log error'})

        }
    }
}

module.exports = new authController()