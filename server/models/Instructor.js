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
        default: "Egypt"
    },
    courses: {
        type: [String],
        default: []
    }
})

module.exports = mongoose.model('Instructor', Instructor)