const asyncHandler = require("express-async-handler");
const viewerContexts = require("../viewer-contexts.json");
const { getVC } = require("../utils/getViewerContext.util");
const Course = require("../models/Course.model");

const canRequestAccess = asyncHandler(async (req, res, next) => {
  const vc = await getVC(
    req.session.userId,
    req.session.userType,
    req.body.courseId
  );
  if (vc === viewerContexts.enrolledTrainee) {
    throw new Error("You are already enrolled in this course");
  }
  if (vc === viewerContexts.pendingCorporateTrainee) {
    throw new Error("You already requested access for this course");
  }
  if (vc !== viewerContexts.nonEnrolledCorporateTrainee) {
    throw new Error("You cannot request access to courses");
  }
  next();
});

module.exports = {
  canRequestAccess,
};
