const { default: mongoose } = require("mongoose");
const Content = require("../../models/Content.model");
const Course = require("../../models/Course.model");
const Subtitle = require("../../models/Subtitle.model");
const Report = require("../../models/Report.model");
const Exercise = require("../../models/Exercises.model");
const Trainee = require("../../models/Trainee.model");
const User = require("../../models/User.model");
const AccessRequest = require("../../models/AccessRequest.model");
const Refund = require("../../models/Refund.model");
const constant = require("../../constants.json");
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

const updateNote = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    let arrNote = content.Note;
    let traineeId = req.session.userId;
    let note = req.body.Note;
    let index = -1;

    for (let i = 0; i < arrNote.length; i++) {
      if (arrNote[i].Trainee_ID === traineeId) {
        index = i;
        break;
      }
    }

    if (index === -1) arrNote.push({ Trainee_ID: traineeId, note: note });
    else {
      arrNote[index].note = note;
    }

    await Content.findByIdAndUpdate(
      req.params.id,
      { Note: arrNote },
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }
};

const getNote = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    let arrNote = [];

    if (content !== null) {
      arrNote = content.Note;
    }

    const traineeId = req.session.userId;
    let index = -1;

    for (let i = 0; i < arrNote.length; i++) {
      if (traineeId === arrNote[i].Trainee_ID) {
        index = i;
        break;
      }
    }

    res.json({
      TraineeNote: index === -1 ? "" : arrNote[index].note,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateVisits = async (req, res) => {
  try {
    const contentID = req.params.conID;
    const traineeID = req.session.userId;
    const contentType = req.params.contentType;

    let contentObj = null;

    if (contentType === constant.content) {
      contentObj = await Content.findById(contentID);
    } else {
      contentObj = await Exercise.findById(contentID);
    }

    let visitArr = contentObj.Visits;

    let index = false;

    for (let i = 0; i < visitArr.length; i++) {
      if (visitArr[i] === traineeID) {
        index = true;
        break;
      }
    }

    let x = null;
    if (!index) {
      visitArr.push(traineeID);
      if (contentType === constant.content)
        x = await Content.findByIdAndUpdate(
          contentID,
          { Visits: visitArr },
          { new: true }
        );
      else
        x = await Exercise.findByIdAndUpdate(
          contentID,
          { Visits: visitArr },
          { new: true }
        );
    }

    res.json(x);
  } catch (err) {
    console.log(err);
  }
};

const getVisits = async (req, res) => {
  try {
    const contentID = req.params.conID;
    const traineeID = req.session.userId;
    const contentType = req.params.contentType;

    let contentObj = null;

    if (contentType === constant.content) {
      contentObj = await Content.findById(contentID);
    } else {
      contentObj = await Exercise.findById(contentID);
    }

    let visitArr = contentObj.Visits;

    let index = false;

    for (let i = 0; i < visitArr.length; i++) {
      if (visitArr[i] === traineeID) {
        index = true;
        break;
      }
    }
    res.json(index);
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

const submitReport = async (req, res) => {
  try {
    const report = await Report.create({
      userId: req.session.userId,
      courseId: req.body.courseId,
      problemType: req.body.problemType,
      body: req.body.problemBody,
      userName: req.body.userName,
      courseName: req.body.courseName,
      summary: req.body.problemSummary,
    });
    const user = await User.findById(req.session.userId);
    user.reports.push(report._id);
    user.save();
    res.status(201).json(report);
  } catch (err) {
    console.log(err);
  }
};

const requestAccess = async (req, res) => {
  try {
    const request = await AccessRequest.create({
      userId: req.session.userId,
      courseId: req.body.courseId,
      userName: req.body.userName,
      courseName: req.body.courseName,
      reason: req.body.reason,
    });
    const course = await Course.findById(req.body.courseId);
    course.pendingTrainees.push(req.session.userId);
    course.save();
    res.status(201).json(request);
  } catch (err) {
    console.log(err);
  }
};

const addFollowup = async (req, res) => {
  try {
    const report = await Report.findById(req.body.problemId);
    report.followups.push(req.body.followup);
    report.save();
    res.status(201).json(report);
  } catch (err) {
    console.log(err);
  }
};
const deleteAccessRequest = async (req, res) => {
  try {
    await AccessRequest.findOneAndDelete({
      userId: req.session.userId,
      courseId: req.params.id,
    });
    const course = await Course.findById(req.params.id);
    let pendingTrainees = [];
    for (let i = 0; i < course.pendingTrainees.length; i++) {
      if (course.pendingTrainees[i].toString() !== req.session.userId) {
        pendingTrainees.push(course.pendingTrainees[i]);
      }
    }
    await Course.findByIdAndUpdate(req.params.id, {
      pendingTrainees: pendingTrainees,
    });
    res.status(201);
  } catch (err) {
    console.log(err);
  }
};

const updateStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedReport = await Report.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedReport);
  } catch (err) {
    console.log(err);
  }
};

const addMultiPromotion = async (req, res) => {
  try {
    await Course.updateMany(
      { _id: { $in: req.body.courses } },
      { $set: { promotion: req.body.promotion } }
    );
  } catch (err) {
    console.log(req.body);
    console.log(err);
  }
};

//Request refund
const requestRefund = async (req, res) => {
  try {
    const course = await Course.findById(req.body.courseId);
    const user = await User.findById(req.session.userId);
    await Refund.create({
      userId: req.session.userId,
      courseId: req.body.courseId,
      userName: user.firstName + " " + user.lastName,
      courseName: course.name,
      reason: req.body.reason,
    });
    res.send(200);
  } catch (err) {
    console.log(req.body);
    console.log(err);
  }
};

//Request refund
const cancelRefund = async (req, res) => {
  try {
    await Refund.delete({
      userId: req.session.userId,
      courseId: req.params.id,
    });
    const course = await Course.findById(req.params.id);
    let refundingTrainees = course.refundingTrainees.filter(
      (trainee) => trainee.toString() !== req.session.userId
    );
    await Course.findByIdAndUpdate(req.params.id, {
      refundingTrainees: refundingTrainees,
    });
    res.send(200);
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
  updateNote,
  getNote,
  updateCourse,
  createSubtitle,
  updateVisits,
  getVisits,
  submitReport,
  requestAccess,
  addFollowup,
  deleteAccessRequest,
  updateStatus,
  addMultiPromotion,
  cancelRefund,
  requestRefund,
};
