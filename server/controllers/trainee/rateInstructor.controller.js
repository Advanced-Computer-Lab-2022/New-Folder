const Instructor = require("../../models/Instructor.model");

const rateInstructor = async (req, res) => {
  const { instructorID, newRating, newReview } = req.body;
  const instructor = await Instructor.findById(instructorID);
  let ratings = instructor.ratings;
  ratings = ratings.filter(
    (rating) => rating.trainee.toString() == req.session.userId
  );
  const ratingNo = ratings.length;
  let rating = (instructor.totalRating * ratingNo + newRating) / (ratingNo + 1);
  if (ratings.length > 0) {
    rating =
      (instructor.totalRating * ratingNo - ratings[0].rating + newRating) /
      ratingNo;
    let newRatings = instructor.ratings.filter(
      (rating) => rating.trainee.toString() != req.session.userId
    );
    await Instructor.findByIdAndUpdate(instructorID, { ratings: newRatings });
  }
  await Instructor.findByIdAndUpdate(instructorID, {
    totalRating: rating,
  });
  instructor.ratings.push({ trainee: req.session.userId, rating: newRating });
  await instructor.save();
  if (newReview) {
    const review = {
      trainee: req.session.userName,
      review: newReview,
    };
    instructor.reviews.push(review);
    await instructor.save();
  }
  res.status(200).json();
};

const reviewInstructor = async (req, res) => {
  const { instructorID, newReview } = req.body;
  const instructor = await Instructor.findById(instructorID);
  if (newReview) {
    const review = {
      trainee: req.session.userName,
      review: newReview,
    };
    instructor.reviews.push(review);
    await instructor.save();
  }
  res.status(200).json();
};

module.exports = { rateInstructor, reviewInstructor };
