const {Schema, model} = require('mongoose')

const Stat = new Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 1000
    },
    rwin: {
        type: Number,
        required: true,
        default: 0
    },
    rdefeat: {
        type: Number,
        required: true,
        default: 0
    },
    rtie: {
        type: Number,
        required: true,
        default: 0
    },
    win: {
        type: Number,
        required: true,
        default: 0
    },
    defeat: {
        type: Number,
        required: true,
        default: 0
    },
    tie: {
        type: Number,
        required: true,
        default: 0
    },
    
})

module.exports = model('Statistics', Stat)