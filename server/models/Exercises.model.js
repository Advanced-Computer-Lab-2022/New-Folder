const mongoose = require("mongoose");

const Exercises = mongoose.Schema({
  Questions: {
    type: [mongoose.Schema.Types.Mixed], // [{statement: , choices: , correctIdx}]
  },
  Mark : {
    type : [mongoose.Schema.Types.Mixed], // {Trainee_ID , Mark}
  }
});

module.exports = mongoose.model("Exercises", Exercises);
