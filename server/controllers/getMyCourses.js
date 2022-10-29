const Course = require("../models/Course");
const User = require("../models/User");
exports.getMyCourses = async (req, res) => {
  const userID = "635ac15b9697b1ff844a01b4";
  const user = await User.findById(userID);
  if (user) {
    const coursesId = user.toJSON().courses;
    const courses = await Promise.all(
      coursesId.map(async (id) => {
        const course = await Course.findById(id);
        return course.toJSON();
      })
    );
    res.send(courses);
  }
};
