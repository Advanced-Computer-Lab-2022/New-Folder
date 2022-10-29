const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const login = asyncHandler(async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({ username });
  //const isCorrectPassword = await bcrypt.compare(password, user.password);
  const isCorrectPassword = password === user.password;
  if (user && isCorrectPassword) {
    req.session.user = user;
    res.status(201).json({ id: user.id, userType: user.toJSON().userType });
  } else {
    res.status(400);
    throw new Error("invalid credintials");
  }
});

module.exports = {
  login,
};
