const mongoose = require("mongoose");
const User = require("./User.model");
const Report = require("./Report.model");
const constants = require("../constants.json");

// email gender firstName lastName image country courses
// inherits from User
const Trainee = mongoose.Schema(
  {
    email: {
      type: String,
      minLength: 3,
      maxLength: 50,
    },
    fields: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    wallet: {
      type: Map,
      of: Number,
      default: {},
    },
    courses: {
      type: [{ type: mongoose.Types.ObjectId, ref: "Course" }],
      default: [],
    },
    reports: {
      type: [{ type: mongoose.Types.ObjectId, ref: "Report" }],
      default: [],
    },
    payments: {
      type: [
        {
          courseId: {
            type: mongoose.Types.ObjectId,
            ref: "Course",
            required: true,
          },
          date: {
            type: Date,
            required: true,
          },
          amounts: {
            type: [
              {
                magnitude: {
                  type: Number,
                  required: true,
                },
                currency: {
                  type: String,
                  required: true,
                },
              },
            ],
            default: [],
          },
        },
      ],
      default: [],
    },
    userType: {
      type: String,
      enum: [constants.trainee, constants.corporateTrainee],
      default: constants.trainee,
    },
    gender: {
      type: String,
      default: "male",
    },
  },
  User
);

module.exports = User.discriminator("Trainee", Trainee);
