const Instructor = require("../../models/Instructor.model");

exports.getMyProfile = async (req, res) => {
  const myInfo = await Instructor.findById(req.session.userId);

  const {
    firstName,
    lastName,
    image,
    about,
    email,
    ratings,
    totalRating,
    reviews,
  } = myInfo;

  res.send({
    firstName,
    lastName,
    image,
    about,
    email,
    ratings,
    totalRating,
    reviews,
  });
};
