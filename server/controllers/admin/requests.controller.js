const Request = require("../../models/AccessRequest.model");
const Course = require("../../models/Course.model");
const Trainee = require("../../models/Trainee.model");
const getRequests = async (req, res) => {
  try {
    const accessRequests = await Request.find({});
    res.status(200).json(accessRequests);
  } catch (err) {
    console.log(err);
  }
};

const updateAndDelete = async(course, request)=>{
    let pendingTrainees = [];
    console.log(request.userId);
    for (let i = 0; i < course.pendingTrainees.length; i++) {
      if (course.pendingTrainees[i].toString() !== request.userId.toString()) {
        pendingTrainees.push(course.pendingTrainees[i]);
      }
    }
    course.pendingTrainees = pendingTrainees;
    await course.save();
    await Request.deleteOne({ id: request.id });
}

const deleteRequest = async (req, res) => {
  try {
    console.log(req.params.id);
    const request = await Request.findById(req.params.id);
    console.log(request);
    const course = await Course.findById(request.courseId);
    updateAndDelete(course, request);
    res.status(200).send("deleted successfully");
  } catch (err) {
    res.status(500);
  }
};

const approveRequest = async(req, res)=> {
    try{
        const request = await Request.findById(req.params.id);
        const course = await Course.findById(request.courseId);
        const trainees = [...course.trainees];
        trainees.push(request.userId);
        course.trainees = trainees;
        updateAndDelete(course, request);
        const trainee = await Trainee.findById(request.userId);
        trainee.courses.push(request.courseId);
        trainee.save();
        res.status(200).send("Approved Successfully");
    }catch(err){
        res.status(500);
    }
}

module.exports = { getRequests, deleteRequest, approveRequest };
