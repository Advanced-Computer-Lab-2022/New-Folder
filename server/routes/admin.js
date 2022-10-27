const express = require("express");
const router = express.Router();

// import controllers
const {getHome} = require("../controllers/admin/home");
const {addInstructor} = require("../controllers/admin/addInstructor")
const {addCorpTrainee} = require("../controllers/admin/addCorporateTrainee")
// import middlewares

// api routes
router.get("/", getHome);

router.post("/addInstructor",addInstructor)

router.post("/addCorporateTrainee",addCorpTrainee)

module.exports = router;
