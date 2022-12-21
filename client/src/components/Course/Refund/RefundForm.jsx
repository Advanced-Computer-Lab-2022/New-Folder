import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { postReport } from "../../../network";
import { ReactSession } from "react-client-session";
import "./RefundForm.css";
function RefundForm(props) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [refundReason, setRefundReason] = useState(null);
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
        problemBody: refundReason,
        courseName: props.course.name,
        userName: ReactSession.get("userName"),
      });
      setValidated(false);
      setRefundReason(null);
      setShow(false);
    }
  };
  const cancel = () => {
    setValidated(false);
    setRefundReason(null);
    setShow(false);
  };
  return (
    <>
      <Modal show={show} onHide={cancel} centered>
        <Modal.Header>
          <Modal.Title>Request refund</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            id="reportProblemForm"
          >
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Refund reason</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                onChange={(e) => setRefundReason(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please state a reason for your refund
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
              <Button
                variant="primary"
                type="submit"
                className="reportFormButton"
              >
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <Button onClick={(e) => setShow(true)}>Request a refund</Button>
    </>
  );
}

export default RefundForm;
