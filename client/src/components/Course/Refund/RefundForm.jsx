import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import ViewerContexts from "../../../constants/ViewerContexts.json";
import Modal from "react-bootstrap/Modal";
import { requestRefund, cancelRefund } from "../../../network";
import "./RefundForm.css";
import { Card } from "react-bootstrap";
import { GiReceiveMoney } from "react-icons/gi";
function RefundForm(props) {
  const { vc, setVc, courseId } = props;
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
      setValidated(false);
      setRefundReason(null);
      setShow(false);
      setVc(ViewerContexts.refundingTrainee);
      props.setShowPopOver(false);
      await requestRefund({ courseId: courseId, reason: refundReason });
    }
  };
  const close = () => {
    setValidated(false);
    setRefundReason(null);
    setShow(false);
    props.setShowPopOver(false);
  };
  const cancel = async () => {
    setValidated(false);
    setRefundReason(null);
    setShow(false);
    setVc(ViewerContexts.enrolledTrainee);
    props.setShowPopOver(false);
    await cancelRefund(courseId);
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
              <Button onClick={close} className="reportFormButton greyBgHover">
                Close
              </Button>
              <Button type="submit" className="reportFormButton blueBgHover">
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      {vc === ViewerContexts.refundingTrainee ? (
        <Card id="reportButton">
          <div id="reportIconWrapper">
            <GiReceiveMoney
              onClick={cancel}
              style={{ cursor: "pointer", marginBottom: "1%" }}
            />
          </div>
          &nbsp;Cancel refund request
        </Card>
      ) : (
        <Card id="reportButton">
          <div id="reportIconWrapper">
            <GiReceiveMoney
              onClick={(e) => {
                setShow(true);
              }}
              style={{ cursor: "pointer", marginBottom: "1%" }}
            />
          </div>
          &nbsp;Request a refund
        </Card>
      )}
    </>
  );
}

export default RefundForm;
