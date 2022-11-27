const asyncHandler = require("express-async-handler");
const Trainee = require("../../models/Trainee.model");

exports.authUserTakeCourseWithInstructor = asyncHandler(
  async (req, res, next) => {
    if (!req.session.userId) {
      res.redirect("/login");
    }
    const trainee = await Trainee.findById(req.session.userId);
    const courses = trainee.courses;
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].instructorInfo.insId == req.params.instructorID) {
        next();
      }
    }
    res.status(400);
    throw new Error("you are not authorized to rate this instructor");
  }
);
