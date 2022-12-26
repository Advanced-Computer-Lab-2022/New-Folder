import React from "react";
import ViewerContexts from "../../../constants/ViewerContexts.json";
import UserTypes from "../../../constants/UserTypes.json";
import { Button, Spinner } from "react-bootstrap";
import RequestAccess from "../RequestAccess/RequestAccess";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";

function EnrollGoToCourse(props) {
  const { vc, enroll, loadingEnrollBtn, courseId, course, setVc } = props;
  const navigate = useNavigate();

  return (
    <div id="priceEnroll">
      {vc === ViewerContexts.guest ? (
        <>
          {ReactSession.get("userType") === UserTypes.trainee ? (
            <Button
              id="enrollButton"
              variant="dark"
              onClick={enroll}
              disabled={loadingEnrollBtn}
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
          {vc === ViewerContexts.enrolledTrainee ? (
            <Button
              id="goToCourse"
              variant="dark"
              onClick={() => navigate("/watch/" + courseId + "?sId=0&cId=0")}
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
    </div>
  );
}

export default EnrollGoToCourse;
