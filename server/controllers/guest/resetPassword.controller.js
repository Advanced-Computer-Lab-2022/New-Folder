const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../../models/User.model");
require("dotenv").config();

exports.resetPassword = asyncHandler(async (req, res) => {
  const { userID, token, confirmNewPassword } = req.body;
  let newPassword = req.body.newPassword;
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
  const user = await User.findById(userID);
  const encryptedPassword = await bcrypt.hash(newPassword, 12);
  if (user) {
    const secret = process.env.JWT_SECRET + user.password;
    try {
      const payload = jwt.verify(token, secret);
      await User.findByIdAndUpdate(userID, {
        password: encryptedPassword,
      });
      res.status(200).json();
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "This link has expired." });
      return;
    }
  } else {
    res.status(500).json({ error: "Something went wrong." });
    return;
  }
});
