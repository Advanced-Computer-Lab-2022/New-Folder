const asyncHandler = require("express-async-handler");
const constants = require("../constants.json");

const canReport = asyncHandler(async (req, res, next) => {
  if (!req.session.userId) {
    throw new Error("you are not logged in");
  }
  if (req.session.userType === constants.admin) {
    throw new Error("An admin cannot report a course");
  }
  next();
});
module.exports = {
  canReport,
};
