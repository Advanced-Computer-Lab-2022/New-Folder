import "./RateAndReviewInstructor.css";
import { useMemo, useState } from "react";
import ReactStars from "react-rating-stars-component";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { deleteInstructorReview, rateInstructor } from "../../network";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";

const RateAndReviewInstructor = (props) => {
  const [newReview, setNewReview] = useState(props.myReview);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [show, setShow] = useState(false);
  const [confMsg, setConfMsg] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const review = async () => {
    setLoadingAdd(true);
    try {
      await rateInstructor({
        instructorID: props.instructorID,
        newRating: props.myRating,
        newReview,
      });
      props.setMyReview(newReview);
      setConfMsg("Your review was added successfully.");
      props.setHasNewReview(!props.hasNewReview);
      handleShow();
      setLoadingAdd(false);
    } catch {
      setConfMsg("Something went wrong, try again later.");
      setLoadingAdd(false);
      handleShow();
    }
  };

  useEffect(() => {
    setNewReview(props.myReview);
  }, [props.myReview]);

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

  const deleteRev = async () => {
    setLoadingDelete(true);
    await deleteInstructorReview({ instructorID: props.instructorID });
    setLoadingDelete(false);
    props.setMyReview(null);
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
          value={newReview ?? ""}
          onChange={(e) => setNewReview(e.target.value)}
        />
      </div>

      <div id="reviewButtonsContainer">
        {props.myReview !== newReview ? (
          <Button
            className="submitReviewBtn"
            id="cancelReviewBtn"
            disabled={loadingAdd || loadingDelete}
            onClick={() => setNewReview(props.myReview)}
          >
            Cancel changes
          </Button>
        ) : null}
        {props.myReview ? (
          <Button
            className="submitReviewBtn"
            id="delReviewBtn"
            disabled={loadingAdd || loadingDelete}
            onClick={deleteRev}
          >
            Delete review{" "}
            {loadingDelete ? (
              <Spinner
                as="span"
                animation="border"
                className="ms-1"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : null}
          </Button>
        ) : null}
        {newReview?.length > 0 ? (
          <Button
            variant="dark"
            className="submitReviewBtn"
            disabled={loadingAdd || loadingDelete}
            id="addReviewBtn"
            onClick={review}
          >
            {props.myReview ? "Edit review" : "Add review"}
            {loadingAdd ? (
              <Spinner
                as="span"
                animation="border"
                className="ms-1"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : null}
          </Button>
        ) : null}
      </div>

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
