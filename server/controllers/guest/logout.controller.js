const asyncHandler = require("express-async-handler");

exports.logout = asyncHandler(async (req, res) => {
  req.session.destroy();
  res.status(200).send("");
});
