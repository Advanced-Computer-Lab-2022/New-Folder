import React from "react";
import { Button, Row } from "react-bootstrap";
import { MdOutlinePending } from "react-icons/md";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { FiCheckCircle } from "react-icons/fi";
import ProblemStatus from "../../constants/ProblemStatus.json";
import { ReactSession } from "react-client-session";
import UserTypes from "../../constants/UserTypes.json";

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
            {problem.status === ProblemStatus.unseen ? (
              <AiOutlineEyeInvisible />
            ) : (
              <>
                {problem.status === ProblemStatus.pending ? (
                  <MdOutlinePending />
                ) : (
                  <FiCheckCircle />
                )}
              </>
            )}
          </div>
          <small>
            <b>
              {"Course: "}
              <a
                href={"/course/" + problem.courseId}
                id="problemCourseNameLink"
              >
                {problem.courseName}
              </a>
            </b>
            <br />
            {ReactSession.get("userType") === UserTypes.admin ? (
              <>
                <b>Reported by: </b>
                {problem.userName}
              </>
            ) : null}
          </small>
          <div>
            {ReactSession.get("userType") !== UserTypes.admin ? (
              <>
                {problem.status !== ProblemStatus.resolved ? (
                  // <Button>Add follow up</Button>
                  <></>
                ) : null}
              </>
            ) : null}
          </div>
        </Row>
        <div id="problemCard">{problem.body}</div>
      </div>
    </>
  );
}

export default ProblemCard;
