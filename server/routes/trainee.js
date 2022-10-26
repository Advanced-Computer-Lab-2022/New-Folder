const express = require("express");
const router = express.Router();

// import controllers
const { getExplore } = require("../controllers/explore");
const { login } = require("../controllers/login");

// import middlewares

// api routes
router.get("/", getExplore);
router.post("/login", login);

module.exports = router;
