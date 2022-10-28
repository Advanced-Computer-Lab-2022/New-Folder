const Course = require("../models/Course");

exports.postSearch = async (req, res) => {
  const courses = await Course.aggregate([
    {
      $search: {
        index: "courses",
        text: {
          query: req.body.query,
          path: ["name", "subject"],
        },
      },
    },
  ]);
  res.send(courses);
};
