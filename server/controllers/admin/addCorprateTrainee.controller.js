const bcrypt = require("bcryptjs");
const constants = require("../../constants.json");
const CorpTrainee = require("../../models/Trainee.model");
exports.addCorpTrainee = async (req, res) => {
  try {
    const encryptedPassword = await bcrypt.hash(req.body.password, 12);
    req.body.password = encryptedPassword;
    const corpTrainee = await CorpTrainee.create({
      ...req.body,
      userType: constants.corporateTrainee,
    });
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status.json({ message: err.message });
  }
};
