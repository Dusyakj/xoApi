const {Schema, model} = require('mongoose')

const Game = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    isRating: {
        type: Array,
        required: true
    }
})

module.exports = model('SearchGame', Game)