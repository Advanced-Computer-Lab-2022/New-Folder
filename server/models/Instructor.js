const mongoose = require("mongoose");
const User = require("./User");

// email gender firstName lastName image country courses
// inherits from User
const Instructor = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 50,
    },
    gender: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
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
  },
  User
);

module.exports = mongoose.model("Instructor", Instructor);
