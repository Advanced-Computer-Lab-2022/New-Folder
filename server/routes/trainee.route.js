const express = require("express");
const router = express.Router();
const { getName } = require("../controllers/trainee/getTraineeName.controller");
// import middlewares

// api routes
router.get("/name/:id", getName);
module.exports = router;
