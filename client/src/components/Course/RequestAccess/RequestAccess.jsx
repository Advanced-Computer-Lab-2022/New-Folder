import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ViewerContexts from "../../../constants/ViewerContexts.json";
import { postAccessRequest, deleteAccessRequest } from "../../../network";
import { ReactSession } from "react-client-session";
import "./RequestAccess.css";
import SuccessModal from "../../SuccessModal/SuccessModal";
import ErrorModal from "../../ErrorModal/ErrorModal";
function RequestAccess(props) {
  const [pending, setPending] = useState(false);
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [reason, setReason] = useState(null);
  const [requestLoading, setRequestLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const [cancelFail, setCancelFail] = useState(false);
  const [requestFail, setRequestFail] = useState(false);

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
      setRequestLoading(true);
      try {
        await postAccessRequest({
          courseId: props.course._id,
          reason: reason,
          courseName: props.course.name,
          userName: ReactSession.get("userName"),
          corporateName: ReactSession.get("corporateName"),
        });
        props.setVc(ViewerContexts.pendingCorporateTrainee);
        setValidated(false);
        setReason(null);
        setShow(false);
        setRequestSuccess(true);
      } catch (err) {
        setRequestFail(true);
      }
      setRequestLoading(false);
    }
  };
  const cancelRequest = async (event) => {
    setCancelLoading(true);
    try {
      await deleteAccessRequest(props.course._id);
      props.setVc(ViewerContexts.nonEnrolledCorporateTrainee);
      setCancelSuccess(true);
    } catch (err) {
      setCancelFail(true);
    }
    setCancelLoading(false);
  };
  const cancel = () => {
    setValidated(false);
    setReason(null);
    setShow(false);
    setCancelSuccess(false);
    setCancelFail(false);
    setRequestFail(false);
    setRequestSuccess(false);
  };
  return (
    <>
      <SuccessModal
        show={requestSuccess}
        msg="Access request submitted successfully!"
        handleClose={cancel}
      />
      <SuccessModal
        show={cancelSuccess}
        msg="Access request cancelled successfully!"
        handleClose={cancel}
      />
      <ErrorModal show={requestFail || cancelFail} handleClose={cancel} />
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
                onClick={cancel}
                className="requestAccessFormButton greyBgHover"
                disabled={requestLoading}
              >
                Close
              </Button>
              <Button
                type="submit"
                className="requestAccessFormButton blueBgHover"
                disabled={requestLoading}
              >
                {requestLoading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      className="ms-1"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    {" Saving"}
                  </>
                ) : (
                  <>Submit</>
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      {pending ? (
        <Button
          className="accessButton redBgHover"
          onClick={cancelRequest}
          disabled={cancelLoading}
        >
          {cancelLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                className="ms-1"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              {" Cancelling"}
            </>
          ) : (
            <> Cancel access request</>
          )}
        </Button>
      ) : (
        <Button
          className="accessButton blackBgHover"
          onClick={() => setShow(true)}
          hidden={pending}
        >
          Request access
        </Button>
      )}
    </>
  );
}

export default RequestAccess;
