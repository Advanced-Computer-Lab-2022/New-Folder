const mongoose = require("mongoose");
const Refund = mongoose.Schema({
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
  userName: { type: String, required: true },
  courseName: { type: String, required: true },
  reason: { type: String, required: true },
  uniqueUserName: { type: String },
});

module.exports = mongoose.model("Refund", Refund);
