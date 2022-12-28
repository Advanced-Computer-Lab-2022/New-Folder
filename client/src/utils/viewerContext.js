import { ReactSession } from "react-client-session";
import ViewerContexts from "../constants/ViewerContexts.json";
import UserTypes from "../constants/UserTypes.json";

export const getViewerContext = (course) => {
  const userId = ReactSession.get("userId");
  const userType = ReactSession.get("userType");
  console.log(course);
  if (userType === UserTypes.admin) {
    return ViewerContexts.admin;
  }
  if (
    userType === UserTypes.instructor &&
    course.instructorInfo.instructorId === userId
  ) {
    if (course.published) {
      return ViewerContexts.savedAuthor;
    }
    return ViewerContexts.author;
  }
  if (course.refundingTrainees?.includes(userId)) {
    return ViewerContexts.refundingTrainee;
  }
  console.log(course.trainees);
  console.log(userId);
  if (course.trainees.includes(userId)) {
    return ViewerContexts.enrolledTrainee;
  }
  if (userType === UserTypes.corporateTrainee) {
    if (course.pendingTrainees?.includes(userId)) {
      return ViewerContexts.pendingCorporateTrainee;
    }
    return ViewerContexts.nonEnrolledCorporateTrainee;
  }
  return ViewerContexts.guest;
};
