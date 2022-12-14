import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./ProblemCard.css";
function ProblemCard(props) {
  const { problem } = props;
  const navigate = useNavigate();
  return (
    <>
      <div id="problemContainer">
        <Card.Body id="problemCard">
          <Card.Title>
            <div id="problemSummary">Problem summary</div>
          </Card.Title>
          <Card.Subtitle>{problem.problemType}</Card.Subtitle>
          <Card.Text>{problem.body}</Card.Text>
          <Button
            variant="primary"
            onClick={(e) => navigate("/course/" + problem.courseId)}
          >
            Go to reported course
          </Button>
        </Card.Body>
      </div>
    </>
  );
}

export default ProblemCard;
