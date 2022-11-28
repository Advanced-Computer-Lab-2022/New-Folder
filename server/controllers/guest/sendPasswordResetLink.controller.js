const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const User = require("../../models/User.model");
require("dotenv").config();

exports.sendPasswordResetLink = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (user) {
    const secret = process.env.JWT_SECRET + user.password;
    const payload = {
      email: user.email,
      id: user.id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "60m" });
    const link = `http://localhost:3000/resetPassword/${user.id}/${token}`;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.EMAIL, // ethereal user
        pass: process.env.PASSWORD, // ethereal password
      },
    });

    const msg = {
      from: "process.env.EMAIL", // sender address
      to: `${user.email}`, // list of receivers
      subject: "Reset password", // Subject line
      text: `Use this link to reset your password: ${link}`, // plain text body
    };

    // send mail with defined transport object
    const info = await transporter.sendMail(msg);

    res.status(200).json();
  } else {
    res.status(400);
    throw new Error("user doesn't exist");
  }
});
