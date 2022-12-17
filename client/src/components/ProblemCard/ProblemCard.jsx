import React, { useState } from "react";
import { Form, Button, Card, Col, Row } from "react-bootstrap";
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
import "./ProblemCard.css";
import { useEffect } from "react";
import { addFollowup } from "../../network";
function ProblemCard(props) {
  const { problem } = props;
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
            {/*
            


            Add resolved and pending buttons here for admin and add followup button for trainee
            



            */}
          </Col>
        </Row>
        <div id="problemCard">{problem.body}</div>
        <Accordion id="reportAccordionWrapper">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Followups ({followups.length ?? 0})</Typography>
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
                  <Form.Label as={"h6"}>Add a followup</Form.Label>
                  <Form.Control
                    as="textarea"
                    required
                    onChange={(e) => setNewFollowup(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Followup cannot be empty
                  </Form.Control.Feedback>
                </Form.Group>
                <div id="followupFormFooter">
                  <Button
                    variant="secondary"
                    onClick={cancel}
                    className="followupFormButton"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className="followupFormButton"
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
                <div id="addIconWrapper">
                  <AiOutlinePlusCircle />
                </div>
                &nbsp;Add a followup
              </Card>
            ) : null}
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}

export default ProblemCard;
