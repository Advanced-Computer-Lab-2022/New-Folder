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
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model("Subtitle", Subtitle);
