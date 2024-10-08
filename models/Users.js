const {Schema, model} = require('mongoose')

const User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        default: 'USER'
    }]
})

module.exports = model('Users', User)