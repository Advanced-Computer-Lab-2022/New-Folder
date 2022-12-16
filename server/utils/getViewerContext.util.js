const Course = require("../models/Course.model");
const AccessRequest = require("../models/Course.model");
const viewerContexts = require("../viewer-contexts.json");
const constants = require("../constants.json");

const getVC = async (userId, userType, courseId) => {
  const course = await Course.findById(courseId);
  if (!userId) {
    return viewerContexts.guest;
  }
  if (course.instructorInfo?.instructorId == userId) {
    return viewerContexts.author;
  }
  if (!course.trainees.includes(userId)) {
    if (userType === constants.corporateTrainee) {
      const request = await AccessRequest.findOne({ userId: userId });
      if (!request) {
        return viewerContexts.nonEnrolledCorporateTrainee;
      } else {
        return viewerContexts.pendingCorporateTrainee;
      }
    } else {
      return viewerContexts.guest;
    }
  }
  return viewerContexts.enrolledTrainee;
};

module.exports = { getVC };
