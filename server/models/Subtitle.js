const mongoose = require('mongoose')
const Content = require('./Content')
const Exercises = require('./Exercises')


const Week = mongoose.Schema({
    subtitleNumber: {
        type: Number
    },
    Contents: {
        type: [Content]
    },
    exercises: {
        type: [Exercises]
    }
})

module.exports = Week