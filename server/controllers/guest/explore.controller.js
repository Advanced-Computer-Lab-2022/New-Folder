const Course = require("../../models/Course.model");

exports.getExplore = async (req, res) => {
  const courses = await Course.find();
  courses.sort(
    (course1, course2) => course2.trainees.length - course1.trainees.length
  );
  res.send(courses);
};
