import "./RateAndReviewInstructor.css";
import { useMemo, useState } from "react";
import ReactStars from "react-rating-stars-component";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { deleteInstructorReview, rateInstructor } from "../../network";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import SuccessModal from "../SuccessModal/SuccessModal";
import ErrorModal from "../ErrorModal/ErrorModal";

const RateAndReviewInstructor = (props) => {
  const [newReview, setNewReview] = useState(props.myReview);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const [confMsg, setConfMsg] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseError = () => setShowError(false);
  const handleShowError = () => setShowError(true);

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
      setLoadingAdd(false);
      handleShowError();
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
    try {
      setLoadingDelete(true);
      await deleteInstructorReview({ instructorID: props.instructorID });
      setLoadingDelete(false);
      props.setMyReview(null);
      setConfMsg("Your review was deleted successfully.");
      handleShow();
      props.setHasNewReview(!props.hasNewReview);
    } catch {
      setLoadingAdd(false);
      handleShowError();
    }
  };

  let Stars = useMemo(() => {
    return () => (
      <ReactStars
        count={5}
        size={36}
        isHalf={true}
        activeColor="#ffd700"
        value={props.myRating}
        edit={true}
        onChange={(val) => rate(val)}
      />
    );
  }, [props.myRating]);

  return (
    <div id="rateInstructorMain" className="whiteCard">
      <div id="labelRating">
        <h4 id="ratingLabel">
          {props.myRating ? "Your rating" : "Rate this instructor"}
        </h4>
        <span id="ratingStars">
          <Stars />
        </span>
      </div>
      <h4 id="reviewLabel">
        Write a review <span className="greyTxt">(optional)</span>
      </h4>
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
            className="submitReviewBtn greyBg greyBgHover"
            disabled={loadingAdd || loadingDelete}
            onClick={() => setNewReview(props.myReview)}
          >
            Cancel changes
          </Button>
        ) : null}
        {props.myReview ? (
          <Button
            className="submitReviewBtn redBg redBgHover"
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
            className="submitReviewBtn blueBg blueBgHover"
            disabled={loadingAdd || loadingDelete}
            onClick={review}
          >
            {props.myReview ? "Update review" : "Add review"}
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
      <SuccessModal msg={confMsg} show={show} handleClose={handleClose} />
      <ErrorModal show={showError} handleClose={handleCloseError} />
    </div>
  );
};

export default RateAndReviewInstructor;
