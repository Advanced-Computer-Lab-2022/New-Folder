const mongoose = require("mongoose");
const Question = require("./Question.schema");

const Exercises = mongoose.Schema({
  Questions: {
    type: [Question], // [{statement: , choices: , correctIdx}]
  },
  Mark: {
    type: [mongoose.Schema.Types.Mixed], // {Trainee_ID , Mark}
  },
});

module.exports = mongoose.model("Exercises", Exercises);
