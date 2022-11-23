import React from "react";
import { useState, useEffect } from "react";
function ReviewCard(props) {
  //TODO: make a GET request to the back end to get the user name instead of displaying the user id
  const [trainee, setTrainee] = useState("");
  const [reviewText, setReviewText] = useState("");
  useEffect(() => {
    setTrainee(props.review.trainee);
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
