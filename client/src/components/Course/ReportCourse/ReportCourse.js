import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { postReport } from "../../../network";
import ProblemTypes from "../../../constants/ProblemTypes.json";
function ReportCourse(props) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [problemBody, setProblemBody] = useState(null);
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
        courseId: props.courseId,
        problemType: problemType,
        problemBody: problemBody,
      });
      setValidated(false);
      setProblemBody(null);
      setProblemType(null);
      setShow(false);
    }
  };
  const cancel = () => {
    setValidated(false);
    setProblemBody(null);
    setProblemType(null);
    setShow(false);
  };
  return (
    <>
      <Modal show={show} onHide={cancel} size={"lg"} centered>
        <Modal.Header>
          <Modal.Title>Report course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
              <Form.Label>What is your problem?</Form.Label>
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
            <Button variant="secondary" onClick={cancel}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <Button onClick={() => setShow(true)}>Report</Button>
    </>
  );
}

export default ReportCourse;
