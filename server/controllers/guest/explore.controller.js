const Course = require("../../models/Course.model");
const {
  coursePrice,
  courseDuration,
} = require("../course/courseUtils.controller");

exports.getExplore = async (req, res) => {
  const courses = await Course.find();
  courses.sort(
    (course1, course2) => course2.trainees.length - course1.trainees.length
  );
  let coursePrices = await Promise.all(
    courses.map((course) => coursePrice(course))
  );
  let courseDurations = await Promise.all(
    courses.map((course) => courseDuration(course))
  );
  let coursesFormatted = courses.map((course, index) => {
    const { name, subject, totalRating, image, instructorInfo } = course;
    return {
      price: coursePrices[index],
      duration: courseDurations[index],
      instructorName: instructorInfo.instructorName,
      name,
      subject,
      totalRating,
      image,
    };
  });
  res.send(coursesFormatted);
};
