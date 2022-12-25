const bcrypt = require("bcryptjs");
const Instructor = require("../../models/Instructor.model");
const User = require("../../models/User.model");
exports.addInstructor = async (req, res) => {
  try {
    const exists = await User.findOne({ username: req.body.username });
    if (exists) {
      res.status(500).json({ message: "This username already exists" });
    } else {
      const encryptedPassword = await bcrypt.hash(req.body.password, 12);
      req.body.password = encryptedPassword;
      const instructor = await Instructor.create({
        ...req.body,
      });
      res.status(200).json({ message: "success" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
