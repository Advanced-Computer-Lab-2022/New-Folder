const Instructor = require("../../models/Instructor.model");

const getEarnings = async (req, res) => {
  const instructor = await Instructor.findById(req.session.userId);
  res.send(instructor.earnings);
};

module.exports = { getEarnings };
