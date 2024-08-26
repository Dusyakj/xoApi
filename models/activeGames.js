const {Schema, model} = require('mongoose')

const activeGame = new Schema({
    id1: {
        type: String,
        required: true
    },
    id2: {
        type: String,
        required: true
    },
    name1: {
        type: String,
        required: true
    },
    name2: {
        type: String,
        required: true
    },
    win: {
        type: String,
        required: true
    },
    turn: {
        type: String,
        required: true
    },
    item: {
        type: String,
        default: 'X'
    },
    now: {
        type: Number,
        required: true
    },
    game: {
        type: Array,
        required: true
    }
})

module.exports = model('activeGames', activeGame)