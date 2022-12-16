const mongoose = require("mongoose");
const constants = require("../constants.json");
const Subtitle = mongoose.Schema({
  subtitleNumber: {
    type: Number,
  },
  courseId: {
    type: mongoose.Types.ObjectId,
  },
  title: {
    type: String,
  },
  subTitle_Content: {
    type: [
      {
        subTitle_Content_id: {
          type: mongoose.Types.ObjectId,
          required: true,
        },
        type: {
          type: String,
          enum: [constants.content, constants.excercise],
          default: constants.content,
          required: true,
        },
        Visits: {
          // if the traineeId exists here in this array means that he/she has opened it before
          // once a trainee has visited one of the contents it be included in the corresponding Visits array
          type: [{ type: mongoose.Types.ObjectId, ref: "Trainee" }],
          default: [],
        },
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model("Subtitle", Subtitle);
