const mongoose = require("mongoose");
const AccessRequest = mongoose.Schema({
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
  corporateName: { type: String, default: "" },
  reason: { type: String, required: true },
  uniqueUserName: { type: String },
});

module.exports = mongoose.model("AccessRequest", AccessRequest);
