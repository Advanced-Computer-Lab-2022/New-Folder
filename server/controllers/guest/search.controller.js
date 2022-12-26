const Course = require("../../models/Course.model");
const {
  coursePrice,
  courseDuration,
} = require("../course/courseUtils.controller");

exports.postSearch = async (req, res) => {
  const courses = await Course.aggregate([
    {
      $search: {
        index: "courses",
        text: {
          query: req.body.query,
          path: ["name", "subject", "instructorInfo.instructorName"],
        },
      },
    },
  ]);
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
      instructorName: instructorInfo?.instructorName,
      name,
      subject,
      totalRating,
      image,
    };
  });
  res.send(coursesFormatted);
};
