const mongoose = require("mongoose");

const Content = mongoose.Schema({
  courseID: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
  },
  description: {
    type: String,
  },
  duration: {
    type: mongoose.Schema.Types.Mixed, // {hrs: , minutes: , seconds: }
  },
  video: {
    type: String,
  },
});

module.exports = mongoose.model("Content", Content);
