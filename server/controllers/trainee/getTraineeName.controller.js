const Trainee = require("../../models/Trainee.model");

exports.getName = async (req, res) => {
  const trainee = await Trainee.findById(req.params.id);
  res.send({ firstName: trainee.firstName, lastName: trainee.lastName });
};
