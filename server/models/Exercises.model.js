const mongoose = require("mongoose");
const Question = require("./Question.schema");

const Exercises = mongoose.Schema({
  Questions: {
    type: [Question], // [{statement: , choices: , correctIdx}]
  },
  Visits: {
    // if the traineeId exists here in this array means that he/she has opened it before
    // once a trainee has visited one of the contents it be included in the corresponding Visits array
    type: [{ type: String }],
    default: [],
  },
  Mark: {
    type: [mongoose.Schema.Types.Mixed], // {Trainee_ID , Mark}
  },
});

module.exports = mongoose.model("Exercises", Exercises);
