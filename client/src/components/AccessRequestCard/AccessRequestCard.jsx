import React, { useState } from "react";
import { Card, Image } from "semantic-ui-react";
import Button from "react-bootstrap/Button";
import "semantic-ui-css/semantic.min.css";
import { Row, Col, Spinner } from "react-bootstrap";
import { declineAccessRequest, approveAccessRequest } from "../../network";
import "./AccessRequestCard.css";
function AccessRequestCard(props) {
  const {
    request,
    accessRequests,
    setAccessRequests,
    setFail,
    setSuccess,
    setMsg,
  } = props;
  const [approveLoading, setApproveLoading] = useState(false);
  const [declineLoading, setDeclineLoading] = useState(false);
  const deleteRequest = (id) => {
    const newAccessRequests = accessRequests.filter(
      (element) => element._id != id
    );
    setAccessRequests(newAccessRequests);
  };
  const approve = async () => {
    setApproveLoading(true);
    try {
      await approveAccessRequest(request._id);
      deleteRequest(request._id);
      setSuccess(true);
      setMsg("Access request approved successfully!");
    } catch (err) {
      setFail(true);
    }
    setApproveLoading(false);
  };

  const decline = async () => {
    setDeclineLoading(true);
    try {
      await declineAccessRequest(request._id);
      deleteRequest(request._id);
      setSuccess(true);
      setMsg("Access request declined successfully!");
    } catch (err) {
      setFail(true);
    }
    setDeclineLoading(false);
  };

  return (
    <div id="accessRequestContainer">
      <Row md={2} id="accessRequestHeader">
        <Col>
          <h4>{request.userName}</h4>
          <small>
            <b>
              {"Course: "}
              <a
                href={"/course/" + request.courseId}
                id="problemCourseNameLink"
              >
                {request.courseName}
              </a>
            </b>
            <br />
          </small>
        </Col>
        <Col></Col>
      </Row>
      <div id="accessRequestBody">{request.reason}</div>
      <div id="accessRequestFooter">
        {declineLoading ? (
          <>
            <Button
              onClick={() => decline()}
              id="accessRequestDeclineButton"
              disabled
            >
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              {" Saving..."}
            </Button>
            <Button
              onClick={() => approve()}
              id="accessRequestApproveButton"
              disabled
            >
              Approve
            </Button>
          </>
        ) : (
          <>
            {approveLoading ? (
              <>
                <Button
                  onClick={() => decline()}
                  id="accessRequestDeclineButton"
                  disabled
                >
                  Decline
                </Button>
                <Button
                  onClick={() => approve()}
                  id="accessRequestApproveButton"
                  disabled
                >
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  {" Saving..."}
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => decline()}
                  id="accessRequestDeclineButton"
                >
                  Decline
                </Button>
                <Button
                  onClick={() => approve()}
                  id="accessRequestApproveButton"
                >
                  Approve
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AccessRequestCard;
