const mongoose = require("mongoose");

const Question = mongoose.Schema({
    statement : {
        type : String,
        default : ""
    },
    choices : {
        type : [String],
        default : []
    },
    correctIdx : {
        type : Number,
        default : 0,
    }

});

module.exports = Question;
