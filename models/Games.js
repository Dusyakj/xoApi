const {Schema, model} = require('mongoose')

const Game = new Schema({
    id1: {
        type: String,
        unique: true,
        required: true
    },
    id2: {
        type: String,
        unique: true,
        required: true
    },
    win: {
        type: String,
        required: true
    },
    game: {
        type: Array,
        required: true
    }
})

module.exports = model('Games', Game)