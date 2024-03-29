const Instructor = require("../../models/Instructor.model");

exports.getMyProfile = async (req, res) => {
  const myInfo = await Instructor.findById(req.session.userId);

  const { firstName, lastName, about, email, ratings, totalRating } = myInfo;

  res.send({
    firstName,
    lastName,
    about,
    email,
    ratings,
    totalRating,
  });
};
