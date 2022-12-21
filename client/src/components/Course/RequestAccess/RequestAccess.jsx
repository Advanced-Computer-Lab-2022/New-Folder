import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ViewerContexts from "../../../constants/ViewerContexts.json";
import { postAccessRequest, deleteAccessRequest } from "../../../network";
import { ReactSession } from "react-client-session";
import "./RequestAccess.css";
function RequestAccess(props) {
  const [pending, setPending] = useState(false);
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [reason, setReason] = useState(null);
  useEffect(() => {
    setPending(props.vc === ViewerContexts.pendingCorporateTrainee);
  }, [props.vc]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      await postAccessRequest({
        courseId: props.course._id,
        reason: reason,
        courseName: props.course.name,
        userName: ReactSession.get("userName"),
      });
      props.setVc(ViewerContexts.pendingCorporateTrainee);
      setValidated(false);
      setReason(null);
      setShow(false);
    }
  };
  const cancelRequest = async (event) => {
    event.preventDefault();
    props.setVc(ViewerContexts.nonEnrolledCorporateTrainee);
    await deleteAccessRequest(props.course._id);
  };
  const cancel = () => {
    setValidated(false);
    setReason(null);
    setShow(false);
  };
  return (
    <>
      <Modal show={show} onHide={cancel} size={"lg"} centered>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            id="requestAccessForm"
          >
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label as="h5">
                Why do you want to access this course?
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                onChange={(e) => setReason(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please state the reason of enrollment
              </Form.Control.Feedback>
            </Form.Group>
            <div id="requestAccessFormFooter">
              <Button
                variant="secondary"
                onClick={cancel}
                className="requestAccessFormButton"
              >
                Close
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="requestAccessFormButton"
              >
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Button
        className="accessButton"
        variant="danger"
        onClick={cancelRequest}
        hidden={!pending}
      >
        Cancel access request
      </Button>
      <Button
        className="accessButton"
        variant="dark"
        onClick={() => setShow(true)}
        hidden={pending}
      >
        Request access
      </Button>
    </>
  );
}

export default RequestAccess;
