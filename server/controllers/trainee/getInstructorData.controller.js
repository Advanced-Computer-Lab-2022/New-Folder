const Instructor = require("../../models/Instructor.model");

exports.getInstructorData = async (req, res) => {
  const { instructorID } = req.query;
  const instructorInfo = await Instructor.findById(instructorID);

  const {
    firstName,
    lastName,
    image,
    about,
    ratings,
    courses,
    totalRating,
    reviews,
  } = instructorInfo;

  let myRating = ratings.filter(
    (rating) => rating.trainee.toString() == req.session.userId
  );

  myRating = myRating.length > 0 ? myRating[0].rating : null;

  const ratingNo = ratings.length;

  const coursesCount = courses.length;
  res.send({
    firstName,
    lastName,
    image,
    about,
    ratingNo,
    coursesCount,
    totalRating,
    myRating,
    reviews,
  });
};
