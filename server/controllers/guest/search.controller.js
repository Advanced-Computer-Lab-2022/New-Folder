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
