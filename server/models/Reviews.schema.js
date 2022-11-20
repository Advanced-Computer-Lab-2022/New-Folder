const mongoose = require("mongoose");

const Reviews = mongoose.Schema({

  trainee: {
    type: { type: mongoose.Schema.Types.Mixed, ref: "Trainee" },
  },
  review: {
    type: String,
  },
});

module.exports = Reviews;