import React from "react";
import { useState, useEffect } from "react";
import { fetchTraineeName } from "../../network";
function ReviewCard(props) {
  const [trainee, setTrainee] = useState("");
  const [reviewText, setReviewText] = useState("");
  useEffect(() => {
    setTrainee(props.review.traineeName??"");
    setReviewText(props.review.review);
  }, []);
  return (
    <div style={{ border: "1px dotted black" }}>
      <h6>{trainee}</h6>
      <h6>{reviewText}</h6>
    </div>
  );
}

export default ReviewCard;
