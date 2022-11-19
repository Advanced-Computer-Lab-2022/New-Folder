const mongoose = require("mongoose");

const Subtitle = mongoose.Schema({
  subtitleNumber: {
    type: Number,
  },
  Contents: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Content" }],
  },
  exercises: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Exercises" }],
  },
});

module.exports = mongoose.model("Subtitle", Subtitle);
