const mongoose = require('mongoose')
//email password gender firstName lastName image country courses 
const Instructor = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 50
    },
    username:{
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    firstName : {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    country: {
        type: String,
    },
    about: {
        type: String
    },
    courses: {
        type: [String],
        default: []
    },
    ratingNo:{
        type: Number,
        default:0
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    reviews: {
        type: [String],
        default: []
    }
})

module.exports = mongoose.model('Instructor', Instructor)