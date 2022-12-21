import React from "react";
import { Card, Image } from "semantic-ui-react";
import Button from "react-bootstrap/Button";
import "semantic-ui-css/semantic.min.css";
import { Row } from "react-bootstrap";
import { declineAccessRequest, approveAccessRequest } from "../../network";

function RefundInfoCard(props) {
  const { request, allRefunds, setAllRefunds } = props;

  const approve = async () => {
    try {
      //Network logic from Aya's branch
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
        </Card.Content>
      </Card>
    </Card.Group>
  );
}

export default RefundInfoCard;
