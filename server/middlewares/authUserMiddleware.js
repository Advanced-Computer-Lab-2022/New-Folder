const asyncHandler = require("express-async-handler");

const authUser = asyncHandler(async (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/login");
  }
  next();
});

module.exports = {
  authUser,
};
