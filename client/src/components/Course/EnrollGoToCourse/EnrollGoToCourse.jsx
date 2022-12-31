import React from "react";
import ViewerContexts from "../../../constants/ViewerContexts.json";
import UserTypes from "../../../constants/UserTypes.json";
import { Button, Spinner } from "react-bootstrap";
import RequestAccess from "../RequestAccess/RequestAccess";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import "./EnrollGoToCourse.css";
function EnrollGoToCourse(props) {
  const { vc, enroll, loadingEnrollBtn, courseId, course, setVc } = props;
  const navigate = useNavigate();

  return (
    <>
      {vc === ViewerContexts.guest ? (
        <>
          {ReactSession.get("userType") === UserTypes.trainee ? (
            <Button
              className="blackBgHover"
              onClick={enroll}
              disabled={loadingEnrollBtn}
              id="enrollButton"
            >
              Enroll{" "}
              {loadingEnrollBtn ? (
                <Spinner
                  as="span"
                  animation="border"
                  className="ms-1"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : null}
            </Button>
          ) : null}
        </>
      ) : (
        <>
          {[
            ViewerContexts.author,
            ViewerContexts.savedAuthor,
            ViewerContexts.admin,
            ViewerContexts.enrolledTrainee,
          ].includes(vc) ? (
            <Button
              className="blackBgHover"
              onClick={() => navigate("/watch/" + courseId + "?sId=0&cId=0")}
              id="enrollButton"
            >
              Go to course
            </Button>
          ) : (
            <>
              {[
                ViewerContexts.pendingCorporateTrainee,
                ViewerContexts.nonEnrolledCorporateTrainee,
              ].includes(vc) ? (
                <RequestAccess vc={vc} setVc={setVc} course={course} />
              ) : null}
            </>
          )}
        </>
      )}
    </>
  );
}

export default EnrollGoToCourse;
