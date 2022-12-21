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
    type: {
      magnitude: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        required: true,
      },
    },
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
        traineeId: {
          type: mongoose.Types.ObjectId,
          ref: "Trainee",
          required: true,
        },
        traineeName: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          min: 0,
          max: 5,
          required: true,
        },
        review: {
          type: String,
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
  instructorInfo: {
    type: {
      instructorId: {
        type: mongoose.Types.ObjectId,
        ref: "Instructor",
        required: true,
      },
      instructorName: {
        type: String,
        required: true,
      },
    },
  },
  trainees: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Trainee" }],
    default: [],
  },
  subtitles: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Subtitle" }],
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
  pendingTrainees: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Trainee" }],
    default: [],
  },
  refundingTrainees: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Trainee" }],
    default: [],
  },
});

module.exports = mongoose.model("Course", Course);
