const asyncHandler = require("express-async-handler");
const constants = require("../constants.json");
const Report = require("../models/Report.model");
const reportStatus = require("../report-status.json");
const canReport = asyncHandler(async (req, res, next) => {
  if (!req.session.userId) {
    throw new Error("you are not logged in");
  }
  if (req.session.userType === constants.admin) {
    throw new Error("An admin cannot report a course");
  }
  next();
});
const canAddFollowup = asyncHandler(async (req, res, next) => {
  const report = await Report.findById(req.body.problemId);
  if (report.userId != req.session.userId) {
    throw new Error("You are not the owner of this report");
  }
  if (report.status === reportStatus.resolved) {
    throw new Error("You cannot add a followup to a resolved problem");
  }
  next();
});
module.exports = {
  canReport,
  canAddFollowup,
};
