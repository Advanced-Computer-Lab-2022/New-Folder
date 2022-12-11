const mongoose = require("mongoose");
const User = require("./User.model");
const Course = require("./Course.model");
const status = require("../report-status.json");
const problemType = require("../problem-types.json");

const Report = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  problemType: {
    type: String,
    required: true,
    enum: [problemType.financial, problemType.other, problemType.technical],
  },
  status: {
    type: String,
    default: status.unseen,
    required: true,
    enum: [status.pending, status.resolved, status.unseen],
  },
  body: {
    type: String,
    required: true,
  },
});

module.exports = Report;
