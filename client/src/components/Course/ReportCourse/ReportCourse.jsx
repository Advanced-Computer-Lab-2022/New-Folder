import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { postReport } from "../../../network";
import ProblemTypes from "../../../constants/ProblemTypes.json";
import { ReactSession } from "react-client-session";
import "./ReportCourse.css";
import { FiAlertCircle } from "react-icons/fi";
import { Card, Overlay, Spinner, Tooltip } from "react-bootstrap";
import ErrorFeedback from "../../ErrorFeedback/ErrorFeedback";
import SuccessFeedback from "../../SuccessFeedback/SuccessFeedback";
import { useRef } from "react";
function ReportCourse(props) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [problemBody, setProblemBody] = useState(null);
  const [problemSummary, setProblemSummary] = useState(null);
  const [problemType, setProblemType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [editing, setEditing] = useState(true);

  let timeoutId;
  useEffect(() => {
    if (success || fail) {
      timeoutId = setTimeout(cancel, 3000);
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
        setEditing(false);
        setSuccess(true);
      } catch (err) {
        setEditing(false);
        setFail(true);
      }
      setLoading(false);
    }
  };
  const cancel = () => {
    clearTimeout(timeoutId);
    setValidated(false);
    setProblemBody(null);
    setProblemType(null);
    setProblemSummary(null);
    setShow(false);
    setSuccess(false);
    setEditing(false);
    setFail(false);
    props.setShowPopOver(false);
  };
  return (
    <>
      <Modal show={show} onHide={cancel} size={"lg"} centered>
        <>
          <>
            {editing ? (
              <>
                <Modal.Body>
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                    id="reportProblemForm"
                  >
                    <h1 className="text-center">Report Course</h1>
                    <Form.Group className="mb-3">
                      <Form.Label>Problem type</Form.Label>
                      <Form.Select
                        required
                        onChange={(e) => setProblemType(e.target.value)}
                      >
                        <option value="">select problem type</option>
                        <option value={ProblemTypes.financial}>
                          Financial
                        </option>
                        <option value={ProblemTypes.technical}>
                          Technical
                        </option>
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
                      <Form.Label>
                        Problem summary (maximum 50 characters)
                      </Form.Label>
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
                        onClick={cancel}
                        className="reportFormButton greyBgHover"
                        disabled={loading}
                      >
                        Close
                      </Button>
                      <Button
                        type="submit"
                        className="reportFormButton blueBgHover"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                            {" Saving..."}
                          </>
                        ) : (
                          <>{"Submit"}</>
                        )}
                      </Button>
                    </div>
                  </Form>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
              </>
            ) : (
              <>
                {success ? (
                  <SuccessFeedback
                    msg="Course reported successfully!"
                    onClose={cancel}
                  />
                ) : (
                  <>{fail ? <ErrorFeedback onClose={cancel} /> : null}</>
                )}
              </>
            )}
          </>
        </>
      </Modal>
      <Card id="reportButton">
        <div id="reportIconWrapper">
          <FiAlertCircle
            onClick={() => {
              setShow(true);
              setEditing(true);
            }}
            style={{ cursor: "pointer" }}
          />
        </div>
        &nbsp;Report problem
      </Card>
    </>
  );
}

export default ReportCourse;
