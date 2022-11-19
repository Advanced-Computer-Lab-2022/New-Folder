const mongoose = require("mongoose");
const User = require("./User.model");
const constants = require("../constants.json");
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
    },
    courses: {
      type: [{ type: mongoose.Types.ObjectId, ref: "Course" }],
      default: [],
    },
    ratingNo: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviews: {
      type: [String],
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