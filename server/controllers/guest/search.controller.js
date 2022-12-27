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
