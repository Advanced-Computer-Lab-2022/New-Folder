const mongoose = require("mongoose");
const Subtitle = require("./Subtitle");

const Course = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  field: {
    type: String,
  },
  price: {
    type: mongoose.Schema.Types.Mixed,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  introVideo: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  ratingNo: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: [String],
    default: [],
  },
  instructorID: {
    type: mongoose.Types.ObjectId,
    ref: "Instructor",
    required: true,
  },
  trainees: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Trainee" }],
    default: [],
  },
  subtitles: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Subtitle" }],
    default: [],
  },
});

module.exports = mongoose.model("Course", Course);
