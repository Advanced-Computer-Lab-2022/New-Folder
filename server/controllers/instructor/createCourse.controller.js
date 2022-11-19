const Content = require("../../models/Content");
const Course = require("../../models/Course");
const Subtitle = require("../../models/Subtitle");

const createCourse = async (req, res) => {
  console.log(req.body.description);
  const content = await Content.create({
    description: req.body.subtitle,
  });
  const subtitle = await Subtitle.create({
    subtitle: 1,
    Contents: [content._id],
  })
  const course = await Course.create({
    description: req.body.description,
    name: req.body.name,
    field: req.body.field,
    price: { magnitude: req.body.magnitude, currency: req.body.currency },
    instructorInfo: { id: req.session.userId, name: req.session.userName },
    duration: 10,
    subtitles: [subtitle._id],
  });
  res.json(course);
};

module.exports = { createCourse };
