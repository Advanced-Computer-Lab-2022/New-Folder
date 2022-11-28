const Instructor = require("../../models/Instructor.model");

exports.editMyProfile = async (req, res) => {
  const { email, about } = req.body;
  await Instructor.findByIdAndUpdate(req.session.userId, {
    email: email,
    about: about,
  });
  res.status(200).json();
};
