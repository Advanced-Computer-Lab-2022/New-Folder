const Course = require("../../models/Course");

exports.getExplore = async (req, res) => {
  const courses = await Course.find();
  // console.log("That's from explore "  +  (req.headers.authorization))
  res.send(courses);
};
