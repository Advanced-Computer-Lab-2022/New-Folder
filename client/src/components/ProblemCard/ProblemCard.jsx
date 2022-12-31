import React, { useState } from "react";
import { Form, Button, Card, Col, Row, Badge } from "react-bootstrap";
import { MdOutlinePending } from "react-icons/md";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { FiCheckCircle } from "react-icons/fi";
import ProblemStatus from "../../constants/ProblemStatus.json";
import { ReactSession } from "react-client-session";
import UserTypes from "../../constants/UserTypes.json";
import ProblemTypes from "../../constants/ProblemTypes.json";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { GiTwoCoins } from "react-icons/gi";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { updateReportStatus } from "../../network";
import "./ProblemCard.css";
import { useEffect } from "react";
import { addFollowup } from "../../network";
function ProblemCard(props) {
  const { problem, getReports } = props;
  const [followups, setFollowups] = useState([]);
  const [editing, setEditing] = useState(false);
  const [validated, setValidated] = useState(false);
  const [newFollowup, setNewFollowup] = useState(null);
  useEffect(() => {
    setFollowups(problem.followups ?? []);
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      await addFollowup({ problemId: problem._id, followup: newFollowup });
      setFollowups([...followups, newFollowup]);
      setValidated(false);
      setNewFollowup(null);
      setEditing(false);
    }
  };
  const cancel = () => {
    setValidated(false);
    setNewFollowup(null);
    setEditing(false);
  };

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
        <Row md={2} className="problemHeader">
          <Col>
            <h4 id="problemSummary">
              {problem.summary}{" "}
              {problem.status === ProblemStatus.unseen ? (
                <Badge
                  style={{ marginLeft: "1%", fontSize: "13px" }}
                  pill
                  bg="info"
                >
                  {problem.status + " "}
                  <AiOutlineEyeInvisible />
                </Badge>
              ) : (
                <>
                  {problem.status === ProblemStatus.pending ? (
                    <Badge
                      style={{ marginLeft: "1%", fontSize: "13px" }}
                      pill
                      bg="warning"
                      text="dark"
                    >
                      {problem.status + " "}
                      <MdOutlinePending />
                    </Badge>
                  ) : (
                    <Badge
                      style={{ marginLeft: "1%", fontSize: "13px" }}
                      pill
                      bg="success"
                    >
                      {problem.status + " "}
                      <FiCheckCircle />
                    </Badge>
                  )}
                </>
              )}
            </h4>

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
                  {problem.userName + "  @" + problem.uniqueUserName}
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
              {ReactSession.get("userType") == UserTypes.admin && (
                <Col className="mb-1">
                  {problem.status === ProblemStatus.unseen && (
                    <Col className="mb-2">
                      <Button
                        className="blackBgHover"
                        size="sm"
                        onClick={(e) => changeStatus(ProblemStatus.pending)}
                      >
                        mark as pending
                      </Button>
                    </Col>
                  )}
                  {problem.status !== ProblemStatus.resolved && (
                    <Col className="mb-2">
                      <Button
                        className="blueBgHover"
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
        <hr className="m-1" />
        <div id="problemCard">{problem.body}</div>
        <Accordion id="reportAccordionWrapper">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Follow ups ({followups.length ?? 0})</Typography>
          </AccordionSummary>
          <AccordionDetails id="followupsList">
            <ol>
              {followups.map((followup) => {
                return <li>{followup}</li>;
              })}
            </ol>
            {editing ? (
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label as={"h6"}>Add a follow up</Form.Label>
                  <Form.Control
                    as="textarea"
                    required
                    onChange={(e) => setNewFollowup(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Follow up cannot be empty
                  </Form.Control.Feedback>
                </Form.Group>
                <div id="followupFormFooter">
                  <Button
                    onClick={cancel}
                    className="greyBgHover followupFormButton me-4"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="blueBgHover followupFormButton"
                  >
                    Add
                  </Button>
                </div>
              </Form>
            ) : null}
            {problem.status !== ProblemStatus.resolved &&
            !editing &&
            ReactSession.get("userType") !== UserTypes.admin ? (
              <Card
                id="addFollowupButton"
                onClick={() => {
                  setEditing(true);
                }}
              >
                <h6>
                  <AiOutlinePlusCircle
                    style={{ marginTop: "-5px" }}
                    size={18}
                  />{" "}
                  Add a follow up
                </h6>
              </Card>
            ) : null}
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}

export default ProblemCard;
