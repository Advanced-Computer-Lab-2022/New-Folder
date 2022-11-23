const Instructor = require("../../models/Instructor.model");

exports.getInstructorData = async (req, res) => {
  const { instructorID } = req.query;
  const instructorInfo = await Instructor.findById(instructorID);
  const { firstName, lastName, image, about, rating, ratingNo, reviews } =
    instructorInfo;
  res.send({ firstName, lastName, image, about, rating, ratingNo, reviews });
};
