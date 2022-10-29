const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const protectUser = asyncHandler(async (req, res, next) => {
  let token;
  console.log("----- "+ JSON.stringify(req.headers)+"----------------");
  if (
    req.headers.Authorization &&
    req.headers.Authorization.startsWith("Bearer")
  ) {
    try {
      console.log('entered in the middleware check')
      token = req.headers.Authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("not authorized, no token");
  }
});

module.exports = protectUser

