import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import ViewerContexts from "../../../constants/ViewerContexts.json";
import Modal from "react-bootstrap/Modal";
import { postReport } from "../../../network";
import { ReactSession } from "react-client-session";
import "./RefundForm.css";
function RefundForm(props) {
  const { vc, setVc } = props;
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
      //network logic
      setValidated(false);
      setRefundReason(null);
      setShow(false);
      setVc(ViewerContexts.refundingTrainee);
    }
  };
  const close = () => {
    setValidated(false);
    setRefundReason(null);
    setShow(false);
  };
  const cancelRefund = async () => {
    setValidated(false);
    setRefundReason(null);
    setShow(false);
    setVc(ViewerContexts.enrolledTrainee);
  };
  return (
    <>
      <Modal show={show} onHide={close} centered>
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
                onClick={close}
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
      {vc === ViewerContexts.refundingTrainee ? (
        <Button onClick={cancelRefund}>Cancel refund request</Button>
      ) : (
        <Button onClick={(e) => setShow(true)}>Request a refund</Button>
      )}
    </>
  );
}

export default RefundForm;
