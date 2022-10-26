const Course = require("../models/Course.model");

exports.getExplore = async (req, res) => {
  const courses = await Course.find();
  res.send(courses);
};
