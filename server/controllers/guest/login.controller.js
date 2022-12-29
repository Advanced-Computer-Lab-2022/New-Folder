const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../../models/User.model");

exports.login = asyncHandler(async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = (await User.findOne({ username }))?.toJSON();
  const isCorrectPassword = await bcrypt.compare(
    password,
    user?.password ?? ""
  );
  //const isCorrectPassword = password === user.password;
  if (user && isCorrectPassword) {
    req.session.userId = user._id;
    req.session.userType = user.userType ?? "admin";
    req.session.userName =
      (user.firstName ?? user.username) + " " + (user.lastName ?? "");
    req.session.corporateName = user.corporateName;
    res.status(201).json({
      userType: user.userType ?? "admin",
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.username,
      corporateName: user.corporateName,
    });
  } else {
    res.status(500).json({ error: "Incorrect username or password." });
  }
});
