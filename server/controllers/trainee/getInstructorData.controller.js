const Instructor = require("../../models/Instructor.model");

exports.getInstructorData = async (req, res) => {
  const { instructorID } = req.query;
  const instructorInfo = await Instructor.findById(instructorID);

  const { firstName, lastName, about, ratings, courses, totalRating } =
    instructorInfo;

  let myRatingItem = ratings.filter(
    (rating) => rating.traineeId.toString() == req.session.userId
  );

  let myRating = myRatingItem.length > 0 ? myRatingItem[0].rating : null;
  let myReview = myRatingItem.length > 0 ? myRatingItem[0].review : null;

  const ratingNo = ratings.length;

  const coursesCount = courses.length;
  res.send({
    firstName,
    lastName,
    about,
    ratingNo,
    coursesCount,
    totalRating,
    myRating,
    myReview,
    ratings,
  });
};
