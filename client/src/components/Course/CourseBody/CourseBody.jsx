import React from "react";
import ViewerContexts from "../../../constants/ViewerContexts.json";
import "./CourseBody.css";
import "../../../App.css";
function CourseBody(props) {
  const {
    vc,
    validPromotion,
    price,
    percentage,
    totalDuration,
    subject,
    summary,
    trainees,
  } = props;
  return (
    <div id="courseBodyContainer" className="whiteCard">
      {vc !== ViewerContexts.nonEnrolledCorporateTrainee &&
      vc !== ViewerContexts.enrolledTrainee &&
      vc != ViewerContexts.pendingCorporateTrainee ? (
        <>
          {validPromotion ? (
            <>
              <h5 className="courseInfo">
                <b>Price:</b> <del>{price.split(" ")[0] ?? ""}</del>{" "}
                {(
                  parseFloat(price.split(" ")[0]) *
                  (1 - percentage / 100)
                ).toFixed(2)}{" "}
                {props.price.split(" ")[1]}
                {`(-${percentage}%)`}
              </h5>
            </>
          ) : (
            <h5 className="courseInfo">
              <b>Price:</b> {price ?? ""}
            </h5>
          )}
        </>
      ) : null}
      <h5 className="courseInfo">
        <b>Total duration:</b> {totalDuration}
      </h5>
      <h5 className="courseInfo">
        <strong>Subject:</strong> {subject ?? ""}
      </h5>
      <h5 className="courseInfo">
        <strong>Summary:</strong>
        <br /> {summary ?? ""}
      </h5>
      {vc === ViewerContexts.author ? (
        <h5 className="courseInfo">
          <b>Count of enrolled trainees: </b> {trainees.length + " trainee(s)"}
        </h5>
      ) : null}
    </div>
  );
}

export default CourseBody;
