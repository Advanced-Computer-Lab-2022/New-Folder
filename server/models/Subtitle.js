const mongoose = require('mongoose')
const Content = require('./Content')
const Exercises = require('./Exercises')


const Subtitle = mongoose.Schema({
    subtitleNumber: {
        type: Number
    },
    Contents: {
        type: [Content.schema]
    },
    exercises: {
        type: [Exercises.schema]
    }
})

module.exports = mongoose.model('Subtitle', Subtitle);