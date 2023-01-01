const Content = require("../../models/Content.model");
const Course = require("../../models/Course.model");
const InstructorModel = require("../../models/Instructor.model");
const Subtitle = require("../../models/Subtitle.model");

const createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      description: req.body.description,
      name: req.body.name,
      subject: req.body.field,
      price: { magnitude: req.body.magnitude, currency: req.body.currency },
      instructorInfo: {
        instructorId: req.session.userId,
        instructorName: req.session.userName,
      },
      duration: 0,
      introVideo: req.body.introVideo,
      image: req.body.image,
    });
    const subtitles = [];
    for (let i = 0; i < req.body.subtitles.length; i++) {
      const subtitle = await Subtitle.create({
        subtitleNumber: i + 1,
        title: req.body.subtitles[i],
        courseId: course._id,
      });
      subtitles.push(subtitle._id);
    }
    await Course.findByIdAndUpdate(course._id, { subtitles: subtitles });
    await updateInstructorCourses(course._id, req.session.userId);
    res.status(200).json({ courseId: course._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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
