const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../../models/User.model");

exports.sendPasswordResetLink = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (user) {
    res.status(200).json();
  } else {
    res.status(400);
    throw new Error("user doesn't exist");
  }
});
