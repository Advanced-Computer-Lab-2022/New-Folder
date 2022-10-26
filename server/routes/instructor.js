const express = require("express");
const { getExplore } = require("../controllers/explore");
const router = express.Router();
const { login } = require("../controllers/login");
const { protectUser } = require("../middlewares/authUserMiddleware");
// import controllers

// import middlewares

// api routes

module.exports = router;
