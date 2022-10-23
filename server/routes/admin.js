const express = require("express");
const router = express.Router();

// import controllers
const {getHome} = require("../controllers/admin/home");

// import middlewares

// api routes
router.get("/",getHome);


module.exports = router;