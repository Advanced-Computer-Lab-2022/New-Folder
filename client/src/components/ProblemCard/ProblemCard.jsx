import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { MdOutlinePending } from "react-icons/md";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { FiCheckCircle } from "react-icons/fi";
import ProblemStatus from "../../constants/ProblemStatus.json";
import { ReactSession } from "react-client-session";
import UserTypes from "../../constants/UserTypes.json";
import ProblemTypes from "../../constants/ProblemTypes.json";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { GiTwoCoins } from "react-icons/gi";
import { updateReportStatus } from "../../network";
import "./ProblemCard.css";
function ProblemCard(props) {
  const { problem, getReports } = props;

  const changeStatus = async (status) => {
    try {
      const id = problem._id;
      const updatedProplem = await updateReportStatus(id, { status: status });
      getReports();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div id="problemContainer">
        <Row md={2} id={`problemHeader${problem.status}`}>
          <Col>
            <h4 id="problemSummary">{problem.summary}</h4>

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
                  <br />
                </>
              ) : null}
              <b>Problem type: </b>
              {problem.problemType + "  "}
              {problem.problemType === ProblemTypes.technical ? (
                <HiOutlineWrenchScrewdriver />
              ) : (
                <>
                  {problem.problemType === ProblemTypes.financial ? (
                    <GiTwoCoins />
                  ) : null}
                </>
              )}
            </small>
          </Col>
          <Col>
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
            <div id="problemStatus">
              {ReactSession.get("userType") == UserTypes.admin && (
                <Col className="mb-1">
                  {problem.status === ProblemStatus.unseen && (
                    <Col className="mb-1">
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={(e) => changeStatus(ProblemStatus.pending)}
                      >
                        mark as pending
                      </Button>
                    </Col>
                  )}
                  {problem.status !== ProblemStatus.resolved && (
                    <Col className="mb-1">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={(e) => changeStatus(ProblemStatus.resolved)}
                      >
                        mark as resolved
                      </Button>
                    </Col>
                  )}
                </Col>
              )}
            </div>
          </Col>
        </Row>
        <div id="problemCard">{problem.body}</div>
      </div>
    </>
  );
}

export default ProblemCard;
