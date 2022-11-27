const Instructor = require("../../models/Instructor.model");

exports.editMyProfile = async (req, res) => {
  const { newEmail, newAbout } = req.body;
  await Instructor.findByIdAndUpdate(req.session.userId, {
    email: newEmail,
    about: newAbout,
  });
  res.status(200).json();
};
