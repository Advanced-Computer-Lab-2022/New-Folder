import React from "react";
import { Card, Image } from "semantic-ui-react";
import Button from "react-bootstrap/Button";
import "semantic-ui-css/semantic.min.css";
import { Row } from "react-bootstrap";
import { approveRefund, declineRefund } from "../../network";

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
    <Card.Group>
      <Card fluid>
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
          />
          <Card.Header>{request.userName}</Card.Header>
          <Card.Meta>Refund Request</Card.Meta>
          <Card.Description>
            {request.userName + " requests to refund the cost of course: "}
            <a href={`/course/${request.courseId}`}>{request.courseName}</a>
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <Card.Description>{request.reason}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button variant="outline-success" onClick={() => approve()}>
            Approve
          </Button>
          <Button variant="outline-danger" onClick={() => decline()}>
            Decline
          </Button>
        </Card.Content>
      </Card>
    </Card.Group>
  );
}

export default RefundInfoCard;
