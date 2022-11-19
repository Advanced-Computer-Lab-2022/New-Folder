const express = require("express");
const router = express.Router();

// import controllers
const {getHome} = require("../controllers/admin/home.controller");
const {addInstructor} = require("../controllers/admin/addInstructor.controller")
const {addCorpTrainee} = require("../controllers/admin/addCorprateTrainee.controller")
const { addAdmin } = require("../controllers/admin/addAdmin.controller")
// import middlewares

// api routes
router.get("/", getHome);

router.post("/addInstructor",addInstructor)

router.post("/addCorporateTrainee",addCorpTrainee)

router.post("/addAdmin", addAdmin)

module.exports = router;
