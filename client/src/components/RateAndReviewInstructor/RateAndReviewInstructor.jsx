import "./RateAndReviewInstructor.css";
import { useMemo, useState } from "react";
import ReactStars from "react-rating-stars-component";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { rateInstructor } from "../../network";

const RateAndReviewInstructor = (props) => {
  const [newRating, setNewRating] = useState(props.myRating);
  const [newReview, setNewReview] = useState("");

  const submitReview = async () => {
    setNewReview(newReview.trim());
    await rateInstructor({
      instructorID: props.instructorID,
      newRating,
      newReview,
    });
  };

  let Stars = useMemo(() => {
    return () => (
      <ReactStars
        count={5}
        size={50}
        isHalf={true}
        activeColor="#ffd700"
        value={props.myRating}
        edit={true}
        onChange={(rating) => setNewRating(rating)}
      />
    );
  }, [props.myRating]);

  return (
    <div id="rateInstructorMain">
      <h3 id="ratingLabel">Rate this instructor </h3>
      <div id="ratingStars">
        <Stars />
      </div>
      <h3>Write a review (optional)</h3>
      <div id="reviewBox">
        <Form.Control
          size="lg"
          as="textarea"
          onChange={(e) => setNewReview(e.target.value)}
        />
      </div>
      <Button variant="dark" id="submitReviewBtn" onClick={submitReview}>
        {props.myRating ? "Update" : "Submit"}
      </Button>
    </div>
  );
};

export default RateAndReviewInstructor;
