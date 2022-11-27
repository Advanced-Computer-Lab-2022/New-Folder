const Content = require("../../models/Content.model");
const Course = require("../../models/Course.model");
const InstructorModel = require("../../models/Instructor.model");
const Subtitle = require("../../models/Subtitle.model");

const createCourse = async (req, res) => {
  // const subtitles = await req.body.subtitles.map(async (sub, index) => {
  //   const subtitle = await Subtitle.create({
  //     subtitleNumber: index + 1,
  //   });
  //   return subtitle._id;
  // });
  const subtitles = [];
  for (let i = 0; i < req.body.subtitles; i++) {
    const subtitle = await Subtitle.create({
      subtitleNumber: index + 1,
    });
    subtitles.push(subtitle._id);
  }
  const course = await Course.create({
    description: req.body.description,
    name: req.body.name,
    field: req.body.field,
    price: { magnitude: req.body.magnitude, currency: req.body.currency },
    instructorInfo: { id: req.session.userId, name: req.session.userName },
    duration: 0,
    subtitles: subtitles,
    introVideo: req.body.introVideo
  });
  await updateInstructorCourses(course._id, req.session.userId);
  res.json(course);
};

const updateInstructorCourses = async (courseId, instructorId) => {
  const instructor = await InstructorModel.findById(instructorId);
  let updatedCourses = instructor.courses;
  updatedCourses.push(courseId);
  await InstructorModel.findByIdAndUpdate(instructorId, {
    courses: updatedCourses,
  });
};
module.exports = { createCourse };
