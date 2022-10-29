require('dotenv').config()
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const login = asyncHandler(async (req, res) => {
  console.log(req.headers)
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({ username });
  //const isCorrectPassword = await bcrypt.compare(password, user.password);
  const isCorrectPassword = password === user.password;
  if (user && isCorrectPassword) {
    // req.ses= generateToken(user._id);
    
    // here you want to give this user a token by JWT

    // console.log(req.session.cookie.token)
    // console.log(typeof user)
    // const accessToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
    // res.status(201).json({accessToken:accessToken})
    
    let userJSON = user.toJSON();
    console.log("That's before "+ userJSON);
    userJSON.token = generateToken(user._id);
    console.log("That's after "+ JSON.stringify(userJSON));
   
    res.status(201).json(userJSON);
    console.log(res.header);
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
  login,
};
