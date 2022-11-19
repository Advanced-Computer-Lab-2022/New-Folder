const Course = require("../../models/Course.model");
const User = require("../../models/User.model");
exports.getMyCourses = async (req, res) => {
  const user = await User.findById(req.session.userId);
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
