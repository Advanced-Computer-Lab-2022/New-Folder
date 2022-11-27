import "./RateAndReviewInstructor.css";
import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { rateInstructor } from "../../network";

const RateAndReviewInstructor = (props) => {
  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState("");

  const submitReview = async () => {
    setNewReview(newReview.trim());
    await rateInstructor(props.instructorID, { newRating, newReview });
  };

  return (
    <div id="rateInstructorMain">
      <h3 id="ratingLabel">Rate this instructor </h3>
      <div id="ratingStars">
        <ReactStars
          count={5}
          size={50}
          isHalf={true}
          activeColor="#ffd700"
          value={newRating}
          onChange={(rating) => setNewRating(rating)}
        />
      </div>
      <h3>Write a review (optional)</h3>
      <div id="reviewBox">
        <Form.Control
          size="lg"
          type="text"
          onChange={(review) => setNewReview(review)}
        />
      </div>
      <Button variant="dark" id="submitReviewBtn" onClick={submitReview}>
        Submit
      </Button>
    </div>
  );
};

export default RateAndReviewInstructor;
