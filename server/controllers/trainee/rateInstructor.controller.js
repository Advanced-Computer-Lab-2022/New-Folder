const Instructor = require("../../models/Instructor.model");

const rateInstructor = async (req, res) => {
  const { instructorID, newRating, newReview } = req.body;
  const instructor = await Instructor.findById(instructorID);
  let ratings = instructor.ratings;
  const ratingNo = ratings.length;
  ratings = ratings.filter(
    (rating) => rating.traineeId.toString() == req.session.userId
  );
  let rating = (instructor.totalRating * ratingNo + newRating) / (ratingNo + 1);
  if (ratings.length > 0) {
    rating =
      (instructor.totalRating * ratingNo - ratings[0].rating + newRating) /
      ratingNo;
    let newRatings = instructor.ratings.filter(
      (rating) => rating.traineeId.toString() != req.session.userId
    );

    if (newReview.length > 0) {
      newRatings.push({
        traineeId: req.session.userId,
        traineeName: req.session.userName,
        rating: newRating,
        review: newReview,
      });
    } else {
      newRatings.push({
        traineeId: req.session.userId,
        traineeName: req.session.userName,
        rating: newRating,
        review: ratings[0].review,
      });
    }
    await Instructor.findByIdAndUpdate(instructorID, { ratings: newRatings });
  } else {
    instructor.ratings.push({
      traineeId: req.session.userId,
      traineeName: req.session.userName,
      rating: newRating,
      review: newReview,
    });
    await instructor.save();
  }
  await Instructor.findByIdAndUpdate(instructorID, {
    totalRating: rating,
  });
  res.status(200).json();
};

const deleteInstructorReview = async (req, res) => {
  const { instructorID } = req.body;
  const instructor = await Instructor.findById(instructorID);
  let ratings = instructor.ratings;
  const ratingNo = ratings.length;
  // let rating =
  //   instructor.totalRating * ratingNo -
  //     ratings.find((r) => r.traineeId.toString() === req.session.userId)
  //       ?.rating ?? 0 / (ratingNo - 1);
  // ratings = ratings.filter(
  //   (rating) => rating.traineeId.toString() !== req.session.userId
  // );
  // await Instructor.findByIdAndUpdate(instructorID, {
  //   ratings,
  //   totalRating: rating,
  // });
  let ratingIndex = ratings.findIndex(
    (rating) => rating.traineeId.toString() === req.session.userId
  );
  ratings[ratingIndex].review = null;
  await instructor.save();
  res.status(200).json();
};

module.exports = { rateInstructor, deleteInstructorReview };
