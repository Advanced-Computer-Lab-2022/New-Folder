const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Trainee = require("../../models/Trainee.model");
const User = require("../../models/User.model");

exports.signup = asyncHandler(async (req, res) => {
  try {
    const { username, password, email, gender, firstName, lastName } = req.body;
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(password, salt);
    const userExists = await User.findOne({ username: username });
    if (userExists) {
      res.status(500).json({ error: "username already exists" });
      return;
    }
    const user = await Trainee.create({
      username: username,
      password: encryptedPassword,
      gender: gender,
      firstName: firstName,
      lastName: lastName,
      email: email,
    });
    req.session.userId = user._id;
    req.session.userType = user.userType ?? "admin";
    req.session.userName =
      (user.firstName ?? user.username) + " " + (user.lastName ?? "");
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});
