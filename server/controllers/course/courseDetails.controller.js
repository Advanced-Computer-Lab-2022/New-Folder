const { default: mongoose } = require("mongoose");
const Content = require("../../models/Content.model");
const Course = require("../../models/Course.model");
const Subtitle = require("../../models/Subtitle.model");
const constant = require("../../constants.json");
const Exercise = require("../../models/Exercises.model");
const Trainee = require("../../models/Trainee.model");
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

const addReview = async (req, res) => {
  try {
    const course = await Course.findById(req.body.courseId);
    let ratings = course.ratings;
    let traineeRating = -1;
    let newRatings = [];
    for (let i = 0; i < ratings.length; i++) {
      if (ratings[i].traineeId.toString() === req.session.userId) {
        traineeRating = ratings[i].rating;
        newRatings.push({
          traineeId: ratings[i].traineeId,
          traineeName: ratings[i].traineeName,
          rating: req.body.rating,
          review: req.body.review,
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
      const trainee = await Trainee.findById(req.session.userId);
      newRatings.push({
        traineeId: req.session.userId,
        traineeName: trainee.firstName + " " + trainee.lastName,
        rating: req.body.rating,
        review: req.body.review,
      });
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
      if (course.ratings[i].traineeId.toString() !== req.session.userId) {
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

const UpdateMark = async (req, res) => {
  try {
    let exercise = await Exercise.findById(req.params.id);
    let arrMark = exercise.Mark;
    const traineeId = req.session.userId;
    const mark = req.body.Mark;
    let index = -1;

    for (let i = 0; i < arrMark.length; i++) {
      if (traineeId === arrMark[i].Trainee_ID) {
        index = i;
        break;
      }
    }

    if (index === -1) arrMark.push({ Trainee_ID: traineeId, Mark: mark });
    else {
      arrMark[index].Mark =
        arrMark[index].Mark > mark ? arrMark[index].Mark : mark;
    }
    const exerciseNew = await Exercise.findByIdAndUpdate(
      req.params.id,
      { Mark: arrMark },
      { new: true }
    );
    res.json(exerciseNew);
  } catch (err) {
    console.log(err);
  }
};

// get mark of the trainee in addition to exercise total Score
const getMark = async (req, res) => {
  try {
    let exercise = await Exercise.findById(req.params.id);
    let arrMark = [];
    let QuestionsExcerciseLength = -1;
    
    if (exercise !== null) {
      arrMark = exercise.Mark;
      QuestionsExcerciseLength = exercise.Questions.length;
    } 

    const traineeId = req.session.userId;

    let index = -1;

    for (let i = 0; i < arrMark.length; i++) {
      if (traineeId === arrMark[i].Trainee_ID) {
        index = i;
        break;
      }
    }

    res.json({
      Mark: index === -1 ? -1 : arrMark[index].Mark,
      ExerciseLength: QuestionsExcerciseLength,
    });
  } catch (err) {
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
  addReview,
  deleteRating,
  addPromotion,
  UpdateMark,
  getMark,
  updateCourse,
  createSubtitle,
};
