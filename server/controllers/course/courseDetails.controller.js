const { default: mongoose } = require("mongoose");
const Content = require("../../models/Content.model");
const Course = require("../../models/Course.model");
const Exercises = require("../../models/Exercises.model");
const Subtitle = require("../../models/Subtitle.model");
const constant = require("../../constants.json");
const Exercise = require("../../models/Exercises.model");

const getCourseDetails = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.json(course);
  } catch (err) {
    console.log(err);
  }
};

const getSubtitle = async (req, res) => {
  try {
    const subtitle = await Subtitle.findById(req.params.id);
    res.json(subtitle);
  } catch (err) {
    console.log(err);
  }
};

const getVideo = async (req, res) => {
  try {
    const video = await Content.findById(req.params.id);
    res.json(video);
  } catch (err) {
    console.log(err);
  }
};

const getExcercise = async (req, res) => {
  try {
    const excercise = await Exercise.findById(req.params.id);
    res.json(excercise);
  } catch (err) {
    console.log(err);
  }
};

const addRating = async (req, res) => {
  try {
    const course = await Course.findById(req.body.courseId);
    let ratings = course.ratings;
    let traineeRating = -1;
    let newRatings = [];
    for (let i = 0; i < ratings.length; i++) {
      if (ratings[i].trainee.toString() === req.session.userId) {
        traineeRating = ratings[i].rating;
        newRatings.push({
          trainee: ratings[i].trainee,
          rating: req.body.rating,
        });
      } else {
        newRatings.push(ratings[i]);
      }
    }
    if (traineeRating != -1) {
      const totalRating =
        (course.totalRating * ratings.length -
          traineeRating +
          req.body.rating) /
        ratings.length;
      await Course.findByIdAndUpdate(course._id, {
        ratings: newRatings,
        totalRating: totalRating,
      });
    } else {
      const totalRating =
        (course.totalRating * ratings.length + req.body.rating) /
        (ratings.length + 1);
      newRatings.push({ trainee: req.session.userId, rating: req.body.rating });
      await Course.findByIdAndUpdate(course._id, {
        ratings: newRatings,
        totalRating: totalRating,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
const deleteRating = async (req, res) => {
  try {
    const course = await Course.findById(req.body.courseId);
    let ratings = [];
    let traineeRating = 0;
    for (let i = 0; i < course.ratings.length; i++) {
      if (course.ratings[i].trainee.toString() !== req.session.userId) {
        ratings.push(course.ratings[i]);
      } else {
        traineeRating = course.ratings[i].rating;
      }
    }
    const totalRating =
      ratings.length == 0
        ? 0
        : (course.totalRating * (ratings.length + 1) - traineeRating) /
          ratings.length;
    await Course.findByIdAndUpdate(course._id, {
      ratings: ratings,
      totalRating: totalRating,
    });
  } catch (err) {
    console.log(err);
  }
};
const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCourse);
  } catch (err) {
    console.log(err);
  }
};
const addPromotion = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.body.courseId,
      { promotion: req.body.promotion },
      { new: true }
    );
    res.json(updatedCourse);
  } catch (err) {
    console.log(req.body);
    console.log(err);
  }
};
const createSubtitle = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    const subtitle = await Subtitle.create({
      subtitleNumber: course.subtitles.length + 1,
      title: req.body.subtitle,
      courseId: course._id,
    });
    course.subtitles.push(subtitle._id);
    course.save();
    res.json(course);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getSubtitle,
  getVideo,
  getExcercise,
  getCourseDetails,
  getVideo,
  addRating,
  deleteRating,
  addPromotion,
  updateCourse,
  createSubtitle,
};
