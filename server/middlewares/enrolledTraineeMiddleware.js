const asyncHandler = require("express-async-handler");
const constants = require("../constants.json");
const viewerContexts = require("../viewer-contexts.json");
const { getVC } = require("../utils/getViewerContext.util");
const Course = require("../models/Course.model");
const Subtitle = require("../models/Subtitle.model");

const canRateCourse = asyncHandler(async (req, res, next) => {
  if (!req.session.userId) {
    throw new Error("you are not logged in");
  }
  const vc = await getVC(
    req.session.userId,
    req.session.userType,
    req.body.courseId
  );
  if (vc !== viewerContexts.enrolledTrainee) {
    throw new Error("You are not enrolled in this course");
  }
  next();
});

const canDeleteRating = asyncHandler(async (req, res, next) => {
  if (!req.session.userId) {
    throw new Error("you are not logged in");
  }
  const vc = await getVC(
    req.session.userId,
    req.session.userType,
    req.body.courseId
  );
  if (vc !== viewerContexts.enrolledTrainee) {
    throw new Error("You are not enrolled in this course");
  }
  const course = await Course.findById(req.body.courseId);
  let alreadyRated = false;
  for (let i = 0; i < course.ratings.length; i++) {
    if (course.ratings[i].traineeId.toString() === req.session.userId) {
      alreadyRated = true;
      break;
    }
  }
  if (alreadyRated) {
    next();
  } else {
    throw new Error("You have not rated this course before");
  }
});
module.exports = {
  canRateCourse,
  canDeleteRating,
};
