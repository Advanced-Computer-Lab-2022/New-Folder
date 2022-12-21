const asyncHandler = require("express-async-handler");
const Trainee = require("../models/Trainee.model");
const constants = require("../constants.json");

exports.canEnroll = asyncHandler(async (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/login");
  }
  const trainee = await Trainee.findById(req.session.userId);
  if (
    trainee &&
    trainee.userType == constants.trainee &&
    !trainee?.courses?.includes(req.body.courseID)
  ) {
    next();
    return;
  }
  res.status(400);
  throw new Error("you are not allowed to enroll in this course");
});
