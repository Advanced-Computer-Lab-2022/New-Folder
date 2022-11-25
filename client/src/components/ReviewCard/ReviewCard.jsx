import React from "react";
import { useState, useEffect } from "react";
import { fetchTraineeName } from "../../network";
function ReviewCard(props) {
  const [trainee, setTrainee] = useState("");
  const [reviewText, setReviewText] = useState("");
  const fetchTrainee = async (traineeId) => {
    try {
      const traineeName = await fetchTraineeName(traineeId);
      setTrainee(traineeName.firstName + " " + traineeName.lastName);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchTrainee(props.review.trainee);
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
