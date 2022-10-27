const mongoose = require("mongoose");
const User = require("./User");

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
      default: "Egypt",
    },
    courses: {
      type: [{ type: mongoose.Types.ObjectId, ref: "Course" }],
      default: [],
    },
    userType: {
      type: String,
      enum: ["trainee", "corporateTrainee"],
      default: "trainee",
    },
  },
  User
);

module.exports = User.discriminator("Trainee", Trainee);
