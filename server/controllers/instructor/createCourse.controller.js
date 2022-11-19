const Content = require("../../models/Content.model");
const Course = require("../../models/Course.model");
const InstructorModel = require("../../models/Instructor.model");
const Subtitle = require("../../models/Subtitle.model");

const createCourse = async (req, res) => {
  const content = await Content.create({
    description: req.body.subtitle,
  });
  const subtitle = await Subtitle.create({
    subtitle: 1,
    Contents: [content._id],
  });
  const course = await Course.create({
    description: req.body.description,
    name: req.body.name,
    field: req.body.field,
    price: { magnitude: req.body.magnitude, currency: req.body.currency },
    instructorInfo: { id: req.session.userId, name: req.session.userName },
    duration: 10,
    subtitles: [subtitle._id],
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
