const Course = require("../models/Course");

exports.postSearch = async (req, res) => {
  const courses = await Course.find();
  res.send(courses);
};
