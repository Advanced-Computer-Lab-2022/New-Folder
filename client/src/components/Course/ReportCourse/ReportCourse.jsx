import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { postReport } from "../../../network";
import ProblemTypes from "../../../constants/ProblemTypes.json";
import { ReactSession } from "react-client-session";
import "./ReportCourse.css";
import { Row } from "react-bootstrap";
function ReportCourse(props) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [problemBody, setProblemBody] = useState(null);
  const [problemSummary, setProblemSummary] = useState(null);
  const [problemType, setProblemType] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      await postReport({
        courseId: props.course._id,
        problemType: problemType,
        problemBody: problemBody,
        problemSummary: problemSummary,
        courseName: props.course.name,
        userName: ReactSession.get("userName"),
      });
      setValidated(false);
      setProblemBody(null);
      setProblemType(null);
      setProblemSummary(null);
      setShow(false);
    }
  };
  const cancel = () => {
    setValidated(false);
    setProblemBody(null);
    setProblemType(null);
    setProblemSummary(null);
    setShow(false);
  };
  return (
    <>
      <Modal show={show} onHide={cancel} size={"lg"} centered>
        <Modal.Header>
          <Modal.Title>Report course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            id="reportProblemForm"
          >
            <Form.Group className="mb-3">
              <Form.Label>Problem type</Form.Label>
              <Form.Select
                required
                onChange={(e) => setProblemType(e.target.value)}
              >
                <option value="">select problem type</option>
                <option value={ProblemTypes.financial}>Financial</option>
                <option value={ProblemTypes.technical}>Technical</option>
                <option value={ProblemTypes.other}>Other</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please choose the problem type
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Problem summary (maximum 50 characters)</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                required
                maxLength={50}
                onChange={(e) => setProblemSummary(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please state the problem summary
              </Form.Control.Feedback>
              <Form.Label>Problem details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                onChange={(e) => setProblemBody(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please state the problem you want to report
              </Form.Control.Feedback>
            </Form.Group>
            <div id="reportFormFooter">
              <Button
                variant="secondary"
                onClick={cancel}
                className="reportFormButton"
              >
                Close
              </Button>
              <Button variant="primary" type="submit" className="reportFormButton">
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <Button onClick={() => setShow(true)}>Report</Button>
    </>
  );
}

export default ReportCourse;
