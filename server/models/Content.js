const mongoose = require('mongoose')


const Content = mongoose.Schema({
    courseID: {
        type: String
    },
    description: {
        type: String
    },
    duration: { // what type

    },
    video: {
        type: String
    }
})

module.exports = Content