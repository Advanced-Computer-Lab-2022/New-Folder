import "./RateAndReviewInstructor.css";
import { useMemo, useState } from "react";
import ReactStars from "react-rating-stars-component";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { rateInstructor } from "../../network";

const RateAndReviewInstructor = (props) => {
  const [newReview, setNewReview] = useState("");
  const [show, setShow] = useState(false);
  const [confMsg, setConfMsg] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const review = async () => {
    try {
      await rateInstructor({
        instructorID: props.instructorID,
        newRating: props.myRating,
        newReview,
      });
      setNewReview("");
      setConfMsg("Your review was added successfully.");
      props.setHasNewReview(!props.hasNewReview);
      handleShow();
    } catch {
      setConfMsg("Something went wrong, try again later.");
      handleShow();
    }
  };

  const rate = async (rating) => {
    await rateInstructor({
      instructorID: props.instructorID,
      newRating: rating,
      newReview: "",
    });
    let updatedRating = props.myRating
      ? (props.rating * props.ratingNo - props.myRating + rating) /
        props.ratingNo
      : (props.rating * props.ratingNo + rating) / (props.ratingNo + 1);
    if (!props.myRating) props.setRatingNo(props.ratingNo + 1);
    props.setMyRating(rating);
    props.setRating(updatedRating);
    props.setHasNewReview(!props.hasNewReview);
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
        onChange={(val) => rate(val)}
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
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        />
      </div>
      {newReview.length > 0 ? (
        <div id="reviewButtonsContainer">
          <Button
            className="submitReviewBtn"
            variant="outline-dark"
            onClick={() => setNewReview("")}
          >
            cancel changes
          </Button>
          <Button variant="dark" className="submitReviewBtn" onClick={review}>
            Add review
          </Button>
        </div>
      ) : null}
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Body className="mt-3">{confMsg}</Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default RateAndReviewInstructor;
