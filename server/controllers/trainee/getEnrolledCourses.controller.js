const Course = require("../../models/Course.model");
const Trainee = require("../../models/Trainee.model");

const getEnrolledCourses = async (req, res) => {
  const trainee = await Trainee.findById(req.session.userId);
  const courses = [];
  for (let courseId of trainee.courses) {
    let course = await Course.findById(courseId);
    if (course) courses.push(course);
  }
  res.send(courses);
};

module.exports = { getEnrolledCourses };
