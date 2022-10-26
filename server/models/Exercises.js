const mongoose = require("mongoose");

const Exercises = mongoose.Schema({
  Questions: {
    type: [mongoose.Schema.Types.Mixed], // [{statement: , choices: , correctIdx}]
  },
});

module.exports = mongoose.model("Exercises", Exercises);
