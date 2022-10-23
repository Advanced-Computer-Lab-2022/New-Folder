const mongoose = require('mongoose')
//email password gender firstName lastName image country courses isCorporate
const Trainee = mongoose.Schema({
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
        type: [String]
    },
    isCorporate: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Trainee', Trainee)