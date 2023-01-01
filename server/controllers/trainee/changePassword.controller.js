const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../../models/User.model");

exports.changePassword = asyncHandler(async (req, res) => {
  const userId = req.session.userId;
  const oldPassword = req.body.oldPassword;
  let newPassword = req.body.newPassword;
  const confirmNewPassword = req.body.confirmNewPassword;
  if (newPassword.length < 6) {
    res
      .status(500)
      .json({ error: "Password should be at least 6 characters." });
    return;
  }
  if (newPassword !== confirmNewPassword) {
    res
      .status(500)
      .json({ error: "Password confirmation doesn't match entered password" });
    return;
  }
  const user = await User.findById(userId);
  const isCorrectPassword = await bcrypt.compare(oldPassword, user.password);
  const encryptedPassword = await bcrypt.hash(newPassword, 12);
  //const isCorrectPassword = oldPassword === user.password;
  if (!isCorrectPassword) {
    res.status(500).json({ error: "Incorrect old password." });
    return;
  }
  if (user && isCorrectPassword) {
    await User.findByIdAndUpdate(userId, {
      password: encryptedPassword,
    });
    res.status(200).json();
  } else {
    res.status(500).json({ error: "Failed to change the password." });
    return;
  }
});
