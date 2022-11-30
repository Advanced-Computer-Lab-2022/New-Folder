import "./RateAndReviewInstructor.css";
import { useMemo, useState } from "react";
import ReactStars from "react-rating-stars-component";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { rateInstructor, reviewInstructor } from "../../network";

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
    let updatedRating = props.myRating
      ? (props.rating * props.ratingNo - props.myRating + newRating) /
        props.ratingNo
      : (props.rating * props.ratingNo + newRating) / (props.ratingNo + 1);
    props.setRating(updatedRating);
  };

  const rateInstructor = async () => {
    await rateInstructor({
      instructorID: props.instructorID,
      newRating,
    });
    let updatedRating = props.myRating
      ? (props.rating * props.ratingNo - props.myRating + newRating) /
        props.ratingNo
      : (props.rating * props.ratingNo + newRating) / (props.ratingNo + 1);
    props.setRating(updatedRating);
  };

  let Stars = useMemo(() => {
    return () => (
      <ReactStars
        count={5}
        size={40}
        isHalf={true}
        activeColor="#ffd700"
        value={props.myRating}
        edit={true}
        onChange={(rating) => setNewRating(rating)}
      />
    );
  }, [props.myRating]);

  return (
    <Card id="rateInstructorMain">
      <h3 id="ratingLabel">
        {props.myRating ? "Your rating" : "Rate this instructor"}
      </h3>
      <div id="ratingStars">
        <Stars />
      </div>
      <h3 id="reviewLabel">Write a review (optional)</h3>
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
    </Card>
  );
};

export default RateAndReviewInstructor;