const asyncHandler = require("express-async-handler");
const constants = require("../constants.json");
const Instructor = require("../models/Instructor.model");

const authInstructorGivesCourse = asyncHandler(async (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/login");
  } else if (req.session.userType !== constants.instructor) {
    res.redirect("/explore");
  }
  const instructor = await Instructor.findById(req.session.userId);
  const courses = instructor.courses;
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].toString() == req.body.courseID) {
      next();
      return;
    }
  }
  res.status(400);
  throw new Error("you are not authorized to access this course");
});

module.exports = {
  authInstructorGivesCourse,
};
