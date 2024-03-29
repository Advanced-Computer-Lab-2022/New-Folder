const mongoose = require("mongoose");
const User = require("./User.model");
const constants = require("../constants.json");
const Report = require("./Report.model");
// email gender firstName lastName image country courses
// inherits from User
const Instructor = mongoose.Schema(
  {
    email: {
      type: String,
      minLength: 3,
      maxLength: 50,
    },
    gender: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    image: {
      type: String,
    },
    country: {
      type: String,
    },
    about: {
      type: String,
      default: "",
    },
    earnings: {
      type: [
        {
          year: {
            type: Number,
          },
          months: {
            type: [
              {
                month: {
                  type: String,
                },
                payments: {
                  type: [
                    {
                      magnitude: {
                        type: Number,
                      },
                      currency: {
                        type: String,
                      },
                    },
                  ],
                  default: [],
                },
              },
            ],
            default: [],
          },
        },
      ],
      default: [],
    },
    courses: {
      type: [{ type: mongoose.Types.ObjectId, ref: "Course" }],
      default: [],
    },
    totalRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    ratings: {
      type: [
        {
          traineeId: {
            type: mongoose.Types.ObjectId,
            ref: "Trainee",
          },
          traineeName: {
            type: String,
          },
          rating: {
            type: Number,
            min: 0,
            max: 5,
          },
          review: {
            type: String,
          },
        },
      ],
      default: [],
    },
    reports: {
      type: [{ type: mongoose.Types.ObjectId, ref: "Report" }],
      default: [],
    },
    userType: {
      type: String,
      default: constants.instructor,
    },
  },
  User
);

module.exports = User.discriminator("Instructor", Instructor);
