const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../../models/User.model");

exports.changePassword = asyncHandler(async (req, res) => {
  const userId = req.session.userId;
  const password = req.body.oldPassword;
  let newPassword = req.body.newPassword;
  if (newPassword.length < 6) {
    res.status(400);
    throw new Error("invalid password");
  }
  // newPassword = await bcrypt.hash(newPassword,12);
  const user = await User.findById(userId);
  //const isCorrectPassword = await bcrypt.compare(password, user.password);
  const isCorrectPassword = password === user.password;
  if (user && isCorrectPassword) {
    await User.findByIdAndUpdate(userId, {
      password: newPassword,
    });
    res.status(200).json();
  } else {
    res.status(400);
    throw new Error("failed to change the password");
  }
});
