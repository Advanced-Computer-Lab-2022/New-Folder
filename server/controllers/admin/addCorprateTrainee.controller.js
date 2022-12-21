const constants = require("../../constants.json");
const CorpTrainee = require("../../models/Trainee.model");
exports.addCorpTrainee = async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Please Fill the required data");
  }
  const corpTrainee = await CorpTrainee.create({
    ...req.body,
    userType: constants.corporateTrainee,
  });
  res.status(200).json(corpTrainee);
};
