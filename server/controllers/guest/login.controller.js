const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../../models/User");

exports.login = asyncHandler(async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({ username });
  //const isCorrectPassword = await bcrypt.compare(password, user.password);
  const isCorrectPassword = password === user.password;
  if (user && isCorrectPassword) {
    req.session.userId = user.id;
    req.session.userType = user.toJSON().userType;
    req.session.userName =
      user.toJSON().firstName + " " + user.toJSON().lastName;
    res.status(201).json({ userType: user.toJSON().userType ?? "admin" });
  } else {
    res.status(400);
    throw new Error("invalid credintials");
  }
});
