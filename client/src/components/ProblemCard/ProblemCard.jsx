import React from "react";
import { Button, Card, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MdOutlinePending } from "react-icons/md";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { FiCheckCircle } from "react-icons/fi";
import ReportStatus from "../../constants/ReportStatus.json";
import "./ProblemCard.css";
function ProblemCard(props) {
  const { problem } = props;
  return (
    <>
      <div id="problemContainer">
        <Row md={2} id={`problemHeader${problem.status}`}>
          <h4 id="problemSummary">{problem.summary}</h4>
          <div id="problemStatus">
            {problem.status + " "}
            {problem.status === ReportStatus.unseen ? (
              <AiOutlineEyeInvisible />
            ) : (
              <>
                {problem.status === ReportStatus.pending ? (
                  <MdOutlinePending />
                ) : (
                  <FiCheckCircle />
                )}
              </>
            )}
          </div>
          <small>
            <b>Reported course:</b>{" "}
            <a href={"/course/" + problem.courseId}>{problem.courseName}</a>
          </small>
          <div></div>
        </Row>
        <div id="problemCard">{problem.body}</div>
      </div>
    </>
  );
}

export default ProblemCard;
