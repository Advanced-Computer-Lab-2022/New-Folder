const bcrypt = require("bcryptjs");
const Instructor = require("../../models/Instructor.model");
exports.addInstructor = async (req, res) => {
  try {
    const encryptedPassword = await bcrypt.hash(req.body.password, 12);
    req.body.password = encryptedPassword;
    const instructor = await Instructor.create({
      ...req.body,
    });

    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
