const bcrypt = require("bcryptjs");
const User = require("../../models/User.model");

exports.addAdmin = async (req, res) => {
  try {
    const exists = await User.findOne({ username: req.body.username });
    if (exists) {
      res.status(500).json({ message: "This username already exists" });
    } else {
      const encryptedPassword = await bcrypt.hash(req.body.password, 12);
      const Admin = await User.create({
        username: req.body.username,
        password: encryptedPassword,
      });
      res.status(200).json({ message: "success" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "There was a network error. Try again later" });
  }
};
