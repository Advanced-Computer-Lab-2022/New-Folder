const Instructor = require("../../models/Instructor.model");

exports.rateInstructor = async (req, res) => {
  const { instructorID } = req.query;
  const { newRating, newReview } = req.body;
  const instructor = await Instructor.findById(instructorID);
  const rating =
    (instructor.rating * instructor.ratingNo + newRating) /
    (instructor.ratingNo + 1);
  await Instructor.findByIdAndUpdate(instructorID, {
    rating: rating,
    ratingNo: instructor.ratingNo + 1,
  });
  if (newReview) {
    // what a review should be?
    const review = {
      trainee: req.session.userName,
      review: newReview,
    };
    instructor.reviews.push(review);
  }
  res.status(200).json();
};
