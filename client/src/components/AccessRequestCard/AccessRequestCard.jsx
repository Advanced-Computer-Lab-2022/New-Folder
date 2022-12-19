import React from "react";
import { Card, Image } from "semantic-ui-react";
import Button from "react-bootstrap/Button";
import "semantic-ui-css/semantic.min.css";
import { Row } from "react-bootstrap";
import { declineAccessRequest, approveAccessRequest } from "../../network";

function AccessRequestCard(props) {
  const request = props.request;

  const approve = async()=>{
    try{
      await approveAccessRequest(request._id);
      props.getRequests();
    }catch(err){
      console.log(err);
    }
  }

  const decline = async()=>{
    try{
      await declineAccessRequest(request._id);
      console.log("done");
      props.getRequests();
    }catch(err){
      console.log(err);
    }
  }

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
          <Card.Meta>Course Access Request</Card.Meta>
          <Card.Description>
            {request.userName + " requests access to course: "}
            <a href={`/course/${request.courseId}`}>{request.courseName}</a>
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <Card.Description>{request.reason}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Row xs={1} md={2}>
            <Button variant="outline-success" onClick={()=>approve()}>Approve</Button>
            <Button variant="outline-danger" onClick={()=>decline()}>Decline</Button>
          </Row>
        </Card.Content>
      </Card>
    </Card.Group>
  );
}

export default AccessRequestCard;
