const Instructor = require("../../models/Instructor.model");
exports.addInstructor = async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Please Fill the required data");
  }
  const instructor = await Instructor.create({
    ...req.body,
  });
  //.save() to save data in the db
  res.status(200).json(instructor);
  //joi library to authenticate schema
  //react entry points,0
};
