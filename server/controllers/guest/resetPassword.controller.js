const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../../models/User.model");
require("dotenv").config();

exports.resetPassword = asyncHandler(async (req, res) => {
  const { userID, token, confirmNewPassword } = req.body;
  let newPassword = req.body.newPassword;
  if (newPassword.length < 6) {
    res.status(400);
    throw new Error("invalid password");
  }
  if (newPassword !== confirmNewPassword) {
    res.status(400);
    throw new Error("password confirmation doesn't match entered password");
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
      res.send(error.message);
    }
  } else {
    res.status(400);
    throw new Error("failed to change the password");
  }
});
