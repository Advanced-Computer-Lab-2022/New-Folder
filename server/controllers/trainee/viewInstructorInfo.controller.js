const Instructor = require("../../models/Instructor.model");

exports.getInstructorData = async (req, res) => {
  const { instructorID } = req.query;
  const instructorInfo = await Instructor.findById(instructorID);
  const { firstName, lastName, image, about, rating, courses, ratingNo } =
    instructorInfo;
  const coursesCount = courses.length;
  res.send({
    firstName,
    lastName,
    image,
    about,
    rating,
    coursesCount,
    ratingNo,
  });
};
