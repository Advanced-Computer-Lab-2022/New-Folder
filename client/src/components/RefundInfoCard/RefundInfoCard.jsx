import React from "react";
import { Card, Image } from "semantic-ui-react";
import Button from "react-bootstrap/Button";
import "semantic-ui-css/semantic.min.css";
import { Col, Row, Spinner } from "react-bootstrap";
import { approveRefund, declineRefund } from "../../network";
import "./RefundInfoCard.css";
import { useState } from "react";
import SuccessModal from "../SuccessModal/SuccessModal";
import ErrorModal from "../ErrorModal/ErrorModal";
function RefundInfoCard(props) {
  const { request, allRefunds, setAllRefunds, setFail, setMsg, setSuccess } =
    props;
  const [approveLoading, setApproveLoading] = useState(false);
  const [declineLoading, setDeclineLoading] = useState(false);
  const approve = async () => {
    setApproveLoading(true);
    try {
      const data = { userId: request.userId, courseId: request.courseId };
      await approveRefund(data);
      const newRefunds = allRefunds.filter(
        (refund) => refund._id != request._id
      );
      setAllRefunds(newRefunds);
      setSuccess(true);
      setMsg("Refund approved successfully!");
    } catch (err) {
      setFail(true);
    }
    setApproveLoading(false);
  };

  const decline = async () => {
    setDeclineLoading(true);
    try {
      const data = { userId: request.userId, courseId: request.courseId };
      await declineRefund(data);
      const newRefunds = allRefunds.filter(
        (refund) => refund._id != request._id
      );
      setAllRefunds(newRefunds);
      setSuccess(true);
      setMsg("Refund declined successfully!");
    } catch (err) {
      setFail(true);
    }
    setDeclineLoading(false);
  };

  return (
    <div id="refundContainer">
      <Row md={2} id="refundHeader">
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
      <div id="refundBody">{request.reason}</div>
      <div id="refundFooter">
        {declineLoading ? (
          <>
            <Button
              onClick={() => decline()}
              id="refundRequestDeclineButton"
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
              id="refundRequestApproveButton"
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
                  id="refundRequestDeclineButton"
                  disabled
                >
                  Decline
                </Button>
                <Button
                  onClick={() => approve()}
                  id="refundRequestApproveButton"
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
                  id="refundRequestDeclineButton"
                >
                  Decline
                </Button>
                <Button
                  onClick={() => approve()}
                  id="refundRequestApproveButton"
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

export default RefundInfoCard;
