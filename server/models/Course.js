const mongoose = require('mongoose')
const Subtitle = require('./Subtitle')

const Course = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    field: {
        type: String
    },
    price: {
        type: mongoose.Schema.Types.Mixed,
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    introVideo: {
        type: String
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: -1
    },
    ratingNo: {
        type: Number,
        default: 0
    },
    reviews: {
        type: [String],
        default: []
    },
    instructorID: {
        type: String,
        required: true
    },
    trainees: {
        type: [String]
    },
    subtitles: {
        type: [Subtitle]
    }
})

module.exports = mongoose.model('Course', Course)