const express = require("express");
const router = express.Router();

// import controllers
const { getExplore } = require("../controllers/explore");
const { login } = require("../controllers/login");
const { postSearch } = require("../controllers/search");

// import middlewares

// api routes
router.get("/", getExplore);
router.post("/login", login);
router.post("/search", postSearch);

module.exports = router;
