import React from "react";
import { Card, Image } from "semantic-ui-react";
import Button from "react-bootstrap/Button";
import "semantic-ui-css/semantic.min.css";
import { Col, Row } from "react-bootstrap";
import { approveRefund, declineRefund } from "../../network";
import "./RefundInfoCard.css";
function RefundInfoCard(props) {
  const { request, allRefunds, setAllRefunds } = props;

  const approve = async () => {
    try {
      const data = { userId: request.userId, courseId: request.courseId };
      await approveRefund(data);
      const newRefunds = allRefunds.filter(
        (refund) => refund._id != request._id
      );
      setAllRefunds(newRefunds);
    } catch (err) {
      console.log(err);
    }
  };

  const decline = async () => {
    try {
      const data = { userId: request.userId, courseId: request.courseId };
      await declineRefund(data);
      const newRefunds = allRefunds.filter(
        (refund) => refund._id != request._id
      );
      setAllRefunds(newRefunds);
    } catch (err) {
      console.log(err);
    }
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
        <Button onClick={() => decline()} id="refundRequestDeclineButton">
          Decline
        </Button>
        <Button onClick={() => approve()} id="refundRequestApproveButton">
          Approve
        </Button>
      </div>
    </div>
  );
}

export default RefundInfoCard;
