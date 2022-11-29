const asyncHandler = require("express-async-handler");
const constants = require("../constants.json");
const authUser = asyncHandler(async (req, res, next) => {
  if (!req.session.userId) {
    throw new Error("you are not logged in");
  }
  next();
});
const authInstructor = asyncHandler(async (req, res, next) => {
  if (!req.session.userId) {
    throw new Error("You are not logged in");
  } else if (req.session.userType !== constants.instructor) {
    throw new Error("You are not an instructor, you cannot create a course");
  }
  next();
});

const authAdmin = asyncHandler(async (req, res, next) => {
  if (!req.session.userId) {
    throw new Error("you are not logged in");
  } else if (req.session.userType !== constants.admin) {
    throw new Error("you are not an admin");
  }
  next();
});
module.exports = {
  authUser,
  authInstructor,
  authAdmin,
};
