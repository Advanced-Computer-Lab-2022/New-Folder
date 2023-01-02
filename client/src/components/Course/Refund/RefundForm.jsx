import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import ViewerContexts from "../../../constants/ViewerContexts.json";
import Modal from "react-bootstrap/Modal";
import { requestRefund, cancelRefund } from "../../../network";
import "./RefundForm.css";
import { Card, Spinner } from "react-bootstrap";
import { GiReceiveMoney } from "react-icons/gi";
import SuccessFeedback from "../../SuccessFeedback/SuccessFeedback";
import ErrorFeedback from "../../ErrorFeedback/ErrorFeedback";
import SuccessModal from "../../SuccessModal/SuccessModal";
import ErrorModal from "../../ErrorModal/ErrorModal";
import { ImCancelCircle } from "react-icons/im";
import colors from "../../../colors.json";
function RefundForm(props) {
  const { vc, setVc, courseId } = props;
  const [newVc, setNewVc] = useState(vc);
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [refundReason, setRefundReason] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const [cancelFail, setCancelFail] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  let timeoutId;
  useEffect(() => {
    if (success || fail) {
      timeoutId = setTimeout(close, 3000);
    }
  }, [success, fail]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      setLoading(true);
      try {
        await requestRefund({ courseId: courseId, reason: refundReason });
        setValidated(false);
        setRefundReason(null);
        setNewVc(ViewerContexts.refundingTrainee);
        setSuccess(true);
      } catch (err) {
        setFail(true);
      }
      setLoading(false);
    }
  };
  const close = () => {
    clearTimeout(timeoutId);
    setValidated(false);
    setRefundReason(null);
    setShow(false);
    setSuccess(false);
    setFail(false);
    setVc(newVc);
    setCancelSuccess(false);
    setCancelFail(false);
    props.setShowPopOver(false);
  };
  const cancel = async () => {
    setCancelLoading(true);
    try {
      await cancelRefund(courseId);
      setNewVc(ViewerContexts.enrolledTrainee);
      setCancelSuccess(true);
    } catch (err) {
      setCancelFail(true);
    }
    setCancelLoading(false);
  };
  return (
    <>
      <SuccessModal
        show={cancelSuccess}
        msg={"Refund request cancelled successfully"}
        handleClose={close}
      />
      <ErrorModal show={cancelFail} handleClose={close} />
      <Modal show={show} onHide={close} centered>
        {success ? (
          <SuccessFeedback msg={"Refund request submitted successfully!"} />
        ) : (
          <>
            {fail ? (
              <ErrorFeedback />
            ) : (
              <>
                <Modal.Header>
                  <Modal.Title>Request refund</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ margin: 0 }}>
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                    id="requestRefundForm"
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
                        onClick={close}
                        className="refundFormButton greyBgHover"
                        disabled={loading}
                      >
                        Close
                      </Button>
                      <Button
                        type="submit"
                        className="refundFormButton blueBgHover"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Spinner as="span" animation="border" size="sm" />
                            {" Saving..."}
                          </>
                        ) : (
                          <>Submit</>
                        )}
                      </Button>
                    </div>
                  </Form>
                </Modal.Body>
              </>
            )}
          </>
        )}
      </Modal>
      {vc === ViewerContexts.refundingTrainee ? (
        <h6 onClick={cancel} style={{ cursor: "pointer", marginBottom: 0 }}>
          {cancelLoading ? (
            <Spinner size="sm" />
          ) : (
            <ImCancelCircle
              onClick={cancel}
              style={{ cursor: "pointer", marginBottom: "3%" }}
            />
          )}
          &nbsp;Cancel refund request
        </h6>
      ) : (
        <Card id="reportButton">
          <h6
            onClick={(e) => {
              setShow(true);
            }}
            style={{ cursor: "pointer" }}
            id="reportIconWrapper"
          >
            <GiReceiveMoney style={{ marginTop: -6 }} size={16} />
            &nbsp;Request a refund
          </h6>
        </Card>
      )}
    </>
  );
}

export default RefundForm;
