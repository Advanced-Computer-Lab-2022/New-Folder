const asyncHandler = require("express-async-handler");
const Refund = require("../models/Refund.model");
const { getVC } = require("../utils/getViewerContext.util");
const viewerContexts = require("../viewer-contexts.json");

const canCancelRefund = asyncHandler(async (req, res, next) => {
  if (!req.session.userId) {
    throw new Error("you are not logged in");
  }
  const refund = await Refund.findOne({
    userId: req.session.userId,
    courseId: req.params.id,
  });
  if (!refund) {
    throw new Error("you have not requested a refund for this course");
  }
  next();
});
const canRequestRefund = asyncHandler(async (req, res, next) => {
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

module.exports = { canCancelRefund, canRequestRefund };
