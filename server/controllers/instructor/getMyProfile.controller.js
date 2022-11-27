const Instructor = require("../../models/Instructor.model");

exports.getMyProfile = async (req, res) => {
  const myInfo = await Instructor.findById(req.session.userId);

  const {
    firstName,
    lastName,
    image,
    about,
    email,
    rating,
    ratingNo,
    reviews,
  } = myInfo;

  res.send({
    firstName,
    lastName,
    image,
    about,
    email,
    rating,
    ratingNo,
    reviews,
  });
};
