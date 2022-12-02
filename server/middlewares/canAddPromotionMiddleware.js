const asyncHandler = require("express-async-handler");
const constants = require("../constants.json");
const viewerContexts = require("../viewer-contexts.json");
const { getVC } = require("../utils/getViewerContext.util");
const Course = require("../models/Course.model");
const Subtitle = require("../models/Subtitle.model");

const canAddPromotion = asyncHandler(async (req, res, next) => {
  if (!req.session.userId) {
    throw new Error("you are not logged in");
  }
  const startDate = new Date(req.body.promotion?.startDate).getTime();
  const endDate = new Date(req.body.promotion?.endDate).getTime();
  if (startDate > endDate) {
    throw new Error("End date must be after start date");
  }
  if (endDate < Date().now) {
    throw new Error("End date must be before today");
  }
  const vc = await getVC(
    req.session.userId,
    req.session.userType,
    req.body.courseId
  );
  if (vc === viewerContexts.author || vc === viewerContexts.admin) {
    next();
  } else {
    throw new Error("You cannot define a promotion to this course");
  }
});

module.exports = { canAddPromotion };
