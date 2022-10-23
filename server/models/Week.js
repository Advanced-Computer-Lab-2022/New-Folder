const mongoose = require('mongoose')
const Content = require('./Content')
const Quiz = require('./Quiz')


const Week = mongoose.Schema({
    courseID: {
        type: String
    },
    weekNumber: {
        type: Number
    },
    Contents: {
        type: [Content]
    },
    Quiz: {
        type: [Quiz]
    }
})

module.exports = Week