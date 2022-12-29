import React from "react";
import ViewerContexts from "../../../constants/ViewerContexts.json";
import "./CourseBody.css";
import "../../../App.css";
import { BsClockFill, BsFillPeopleFill } from "react-icons/bs";
import { IoBookSharp } from "react-icons/io5";
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
        <BsClockFill size={17} style={{ marginBottom: 5, marginRight: 5 }} />{" "}
        {totalDuration ?? "2 Hours"}
      </h5>
      {vc === ViewerContexts.author || vc === ViewerContexts.savedAuthor ? (
        <h5 className="courseInfo">
          <BsFillPeopleFill
            size={17}
            style={{ marginBottom: 5, marginRight: 5 }}
          />{" "}
          {trainees.length + " trainee(s)"}
        </h5>
      ) : null}
      <h5 className="courseInfo">
        <IoBookSharp size={17} style={{ marginBottom: 4, marginRight: 5 }} />{" "}
        {subject ?? "Computer science"}
      </h5>
      <h6 style={{ color: "#666666" }}>{summary}</h6>
    </div>
  );
}

export default CourseBody;
