const { default: mongoose } = require('mongoose');
const courseModel = require('../../models/Course.model');

async function findCoursebyID (id) {

    let courseFound = await courseModel.findOne({
        _id:id
    });

    return courseFound;
};

let getCourseFromController = async (req, res , next) => {
    // get Course ID
    let reqId = req.params.id;

    // get Course from DB
    let coursewithreqID = await findCoursebyID(reqId);

    res.send(coursewithreqID);
    // render and pass Course
}

module.exports = getCourseFromController;

