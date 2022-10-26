const express = require("express");
const router = express.Router();

// import controllers
const { getExplore } = require("../controllers/trainee/explore");

// import middlewares

// api routes
router.get("/", getExplore);

module.exports = router;
