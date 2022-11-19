const asyncHandler = require("express-async-handler");
const constants = require("../constants.json");
const authUser = asyncHandler(async (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/login");
  }
  next();
});
const authInstructor = asyncHandler(async (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/login");
  } else if (req.session.userType !== constants.instructor) {
    res.redirect("/login");
  }
  next();
});

const authAdmin = asyncHandler(async (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/login");
  } else if (req.session.userType !== constants.admin) {
    res.redirect("/login");
  }
  next();
});
module.exports = {
  authUser,
  authInstructor,
  authAdmin,
};
