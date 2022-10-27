const express = require("express");
const router = express.Router();

// import controllers
const {getHome} = require("../controllers/admin/home");
const {addInstructor} = require("../controllers/admin/addInstructor")
const {addCorpTrainee} = require("../controllers/admin/addCorprateTrainee")
const { addAdmin } = require("../controllers/admin/addAdminController")
// import middlewares

// api routes
router.get("/", getHome);

router.post("/addInstructor",addInstructor)

router.post("/addCorporateTrainee",addCorpTrainee)

router.post("/addAdmin", addAdmin)

module.exports = router;
