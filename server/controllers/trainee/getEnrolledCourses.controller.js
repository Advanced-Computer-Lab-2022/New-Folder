const Course = require("../../models/Course.model");
const Trainee = require("../../models/Trainee.model");
const {
  coursePrice,
  courseDuration,
} = require("../course/courseUtils.controller");

const getEnrolledCourses = async (req, res) => {
  const trainee = await Trainee.findById(req.session.userId);

  let courses = await Promise.all(
    trainee.courses.map((courseId) => Course.findById(courseId))
  );

  //filter published courses

  let courseDurations = await Promise.all(
    courses.map((course) => courseDuration(course))
  );

  let coursesFormatted = courses.map((course, index) => {
    const { name, subject, totalRating, image, instructorInfo, ratings } =
      course;

    return {
      id: course._id,
      price: coursePrice(course),
      duration: courseDurations[index],
      instructorName: instructorInfo?.instructorName,
      name,
      subject,
      totalRating,
      ratingsCount: ratings?.length ?? 0,
      image,
    };
  });
  res.send(coursesFormatted);
};

module.exports = { getEnrolledCourses };
