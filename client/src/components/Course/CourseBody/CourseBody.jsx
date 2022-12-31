import React from "react";
import ViewerContexts from "../../../constants/ViewerContexts.json";
import "./CourseBody.css";
import "../../../App.css";
import { BsClockFill, BsFillPeopleFill, BsFillStarFill } from "react-icons/bs";
import { MdPayments } from "react-icons/md";
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
    ratingsCount,
    totalRating,
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
                <MdPayments /> <del>{price.split(" ")[0] ?? ""}</del>{" "}
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
              <MdPayments style={{ marginBottom: 4, marginRight: 3 }} />{" "}
              {price ?? ""}
            </h5>
          )}
        </>
      ) : null}
      <h5 className="courseInfo">
        <BsFillStarFill
          size={19}
          style={{ marginLeft: -1, marginBottom: 5, marginRight: 4 }}
          color="ffd700"
        />{" "}
        {totalRating ?? 0}
        <small className="greyTxt">
          &nbsp;&nbsp;&nbsp;
          {"(" + ratingsCount ?? 0}
          {ratingsCount == 1 ? " rating)" : " ratings)"}
        </small>
      </h5>
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
        <IoBookSharp size={17} style={{ marginBottom: 2, marginRight: 5 }} />{" "}
        {subject ?? "Computer science"}
      </h5>
      <h6 style={{ color: "#666666" }}>{summary}</h6>
    </div>
  );
}

export default CourseBody;
