const mongoose = require("mongoose");
const Subtitle = require("./Subtitle");

const Course = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
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
  duration: {
    type: Number,
    default: 0
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
  instructorInfo: {
    type: mongoose.Schema.Types.Mixed, // {insId, insName}
    ref: "Instructor",
    required: true,
  },
  trainees: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Trainee" }],
    default: [],
  },
  subtitles: {
    type: [{ type: mongoose.Schema.Types.Mixed, ref: "Subtitle" }],
    default: [],
  },
});

module.exports = mongoose.model("Course", Course);
