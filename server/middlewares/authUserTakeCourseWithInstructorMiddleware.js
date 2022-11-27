const asyncHandler = require("express-async-handler");
const Trainee = require("../../models/Trainee.model");
const Course = require("../../models/Course.model");

exports.authUserTakeCourseWithInstructor = asyncHandler(
  async (req, res, next) => {
    if (!req.session.userId) {
      res.redirect("/login");
    }
    const trainee = await Trainee.findById(req.session.userId);
    const courses = trainee.courses;
    for (let i = 0; i < courses.length; i++) {
      // this should not be this way
      let course = await Course.findById(courses[i]);
      if (course.instructorInfo.id == req.params.instructorID) {
        next();
      }
    }
    res.status(400);
    throw new Error("you are not authorized to rate this instructor");
  }
);
