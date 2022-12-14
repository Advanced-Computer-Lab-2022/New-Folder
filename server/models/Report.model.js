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
  userName: { type: String, required: true },
  courseId: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  courseName: {
    type: String,
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
  summary: {
    type: String,
    required: true,
  },
  followups: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Followup" }],
    default: [],
  },
});

module.exports = mongoose.model("Report", Report);
