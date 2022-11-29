const mongoose = require("mongoose");
const Subtitle = require("./Subtitle.model");

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
    default: 0,
  },
  ratings: {
    type: [
      {
        trainee: {
          type: mongoose.Types.ObjectId,
          ref: "Trainee",
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
      },
    ],
    default: [],
  },
  totalRating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  reviews: {
    type: [
      {
        trainee: {
          type: String,
        },
        review: {
          type: String,
        },
      },
    ],
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
    type: [{ type: mongoose.Schema.Types.Mixed }],
    default: [],
  },
  promotion: {
    type: {
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
      percentage: {
        type: Number,
        min: 0,
        max: 100,
      },
    },
  },
});

module.exports = mongoose.model("Course", Course);
