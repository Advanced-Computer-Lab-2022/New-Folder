import { ReactSession } from "react-client-session";
import ViewerContexts from "../constants/ViewerContexts.json";
import UserTypes from "../constants/UserTypes.json";

export const getViewerContext = (course) => {
  const userId = ReactSession.get("userId");
  const userType = ReactSession.get("userType");
  if (
    userType === UserTypes.instructor &&
    course.instructorInfo.id === userId
  ) {
    return ViewerContexts.author;
  }
  if (course.trainees.includes(userId)) {
    return ViewerContexts.enrolledTrainee;
  }
  if (userType === UserTypes.corporateTrainee) {
    return ViewerContexts.nonEnrolledCorporateTrainee;
  }
  return ViewerContexts.guest;
};
