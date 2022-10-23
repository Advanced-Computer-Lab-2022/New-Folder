const mongoose = require('mongoose')
const Week = require('./Week')

const Course = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 0
    },
    currency: {
        type: String
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
    revenueAnnual: {
        type: Number
    },
    revenueMonth: {
        type: Number
    },
    revenueWeek: {
        type: Number
    },
    trainees: {
        type: [String]
    },
    Weeks: {
        type: [Week]
    }
})

module.exports = mongoose.model('Course', Course)