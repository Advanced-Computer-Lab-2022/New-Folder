const express = require("express");
const router = express.Router();

// import controllers
const { getExplore } = require("../controllers/guest/explore.controller");
const { login } = require("../controllers/guest/login.controller");
const { postSearch } = require("../controllers/guest/search.controller");

// import middlewares

// api routes
router.get("/", getExplore);
router.post("/login", login);
router.post("/search", postSearch);
module.exports = router;
