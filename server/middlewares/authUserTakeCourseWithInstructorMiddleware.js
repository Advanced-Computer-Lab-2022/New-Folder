const asyncHandler = require("express-async-handler");
const Trainee = require("../models/Trainee.model");
const Course = require("../models/Course.model");
const Instructor = require("../models/Instructor.model");

exports.authUserTakeCourseWithInstructor = asyncHandler(
  async (req, res, next) => {
    if (!req.session.userId) {
      res.redirect("/login");
    }
    const instructor = await Instructor.findById(req.body.instructorID);
    const instructorCourses = instructor.courses;
    const trainee = await Trainee.findById(req.session.userId);
    const courses = trainee.courses;
    for (let i = 0; i < courses.length; i++) {
      if (instructorCourses.includes(courses[i])) {
        next();
        return;
      }
    }
    res.status(400);
    throw new Error("you are not authorized to rate this instructor");
  }
);
