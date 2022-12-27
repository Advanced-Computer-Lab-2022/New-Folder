const Course = require("../../models/Course.model");
const Instructor = require("../../models/Instructor.model");
const {
  coursePrice,
  courseDuration,
} = require("../course/courseUtils.controller");

exports.getMyCourses = async (req, res) => {
  const instructor = await Instructor.findById(req.session.userId);

  let courses = await Promise.all(
    instructor.courses.map((courseId) => Course.findById(courseId))
  );

  let coursePrices = await Promise.all(
    courses.map((course) => coursePrice(course))
  );

  let coursesFormatted = courses.map((course, index) => {
    const { name, subject, totalRating, image, instructorInfo } = course;
    return {
      id: course._id,
      price: coursePrices[index],
      duration: courseDuration(course),
      instructorName: instructorInfo?.instructorName,
      name,
      subject,
      totalRating,
      image,
    };
  });
  res.send(coursesFormatted);
};
