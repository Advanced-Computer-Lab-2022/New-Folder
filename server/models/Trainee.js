const mongoose = require("mongoose");
const User = require("./User");

// email gender firstName lastName image country courses
// inherits from User
const Trainee = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 50,
    },
    fields: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
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
      default: "Egypt",
    },
    courses: {
      type: [{ type: mongoose.Types.ObjectId, ref: "Course" }],
      default: [],
    },
  },
  User
);

module.exports = User.discriminator("Trainee", Trainee);
