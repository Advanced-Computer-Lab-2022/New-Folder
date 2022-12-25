const mongoose = require("mongoose");

const Content = mongoose.Schema({
  courseID: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
  },
  description: {
    type: String,
  },
  title: {
    type: String,
  },
  duration: {
    type: mongoose.Schema.Types.Mixed, // {hrs: , minutes: , seconds: }
  },
  video: {
    type: String,
  },
  Note: {
    type: [mongoose.Schema.Types.Mixed], //Trainee_id , note
  },
  Visits: {
    // if the traineeId exists here in this array means that he/she has opened it before
    // once a trainee has visited one of the contents it be included in the corresponding Visits array
    type: [{ type: String }],
    default: [],
  },
});

module.exports = mongoose.model("Content", Content);
