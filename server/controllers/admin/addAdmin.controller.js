const User = require("../../models/User.model");
exports.addAdmin = async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Please Fill the required data");
  }
  const Admin = await User.create({
    username: req.body.username,
    password: req.body.password,
  });
  res.status(200).json(Admin);
};
