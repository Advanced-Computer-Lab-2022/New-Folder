import React, { useState } from "react";
import { Card, Image } from "semantic-ui-react";
import Button from "react-bootstrap/Button";
import "semantic-ui-css/semantic.min.css";
import { Row, Col, Spinner } from "react-bootstrap";
import { BiBuildings } from "react-icons/bi";
import { BsBookHalf } from "react-icons/bs";
import { declineAccessRequest, approveAccessRequest } from "../../network";
import "./AccessRequestCard.css";
//import "../../App.css"
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
    <div id="accessRequestContainer" className="whiteCard">
      <Row md={2} id="accessRequestHeader">
        <Col>
          <h4>
            {request.userName}
            <br /> <h6 className="greyTxt">{"@" + request.uniqueUserName}</h6>
          </h4>
          <small>
            <BiBuildings size={18} />
            <b>{" " + request.corporateName}</b>
            <br />
          </small>
          <small>
            <b>
              <BsBookHalf size={16} />
              <a
                href={"/course/" + request.courseId}
                id="problemCourseNameLink"
              >
                {" " + request.courseName}
              </a>
            </b>
            <br />
          </small>
        </Col>
        <Col></Col>
      </Row>
      <hr className="m-1" />
      <div id="accessRequestBody">{request.reason}</div>
      <div id="accessRequestFooter">
        <Button
          onClick={() => decline()}
          className="redBgHover accessRequestButton"
          disabled={approveLoading || declineLoading}
        >
          Decline{" "}
          {declineLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : null}
        </Button>
        <Button
          onClick={() => approve()}
          className="blueBgHover accessRequestButton"
          disabled={approveLoading || declineLoading}
        >
          Approve{" "}
          {approveLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : null}
        </Button>
      </div>
    </div>
  );
}

export default AccessRequestCard;
