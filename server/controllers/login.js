const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Instructor = require("../models/Instructor");

const login = asyncHandler(async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const instructor = await Instructor.findOne({ username });

  if (instructor && (await bcrypt.compare(password, instructor.password))) {
    res.status(201).json({
      _id: instructor.id,
      userName: instructor.userName,
      email: instructor.email,
      token: generateToken(instructor._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid credintials");
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  loginInstructor,
};
