import "./ReviewsCard.css";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import ReactStars from "react-rating-stars-component";
import { useState, useEffect } from "react";

const ReviewCard = (props) => {
  const [lastReviewIndex, setLastReviewIndex] = useState(3);
  const [reviews, setReviews] = useState([]);

  let Stars = (prop) => (
    <ReactStars
      count={5}
      size={25}
      isHalf={true}
      activeColor="#ffd700"
      value={prop.rating}
      edit={false}
    />
  );

  useEffect(() => {
    const tempReviews = [];
    for (let i = 0; i < props.reviews.length && i < lastReviewIndex; i++) {
      tempReviews.push(
        <Card className="cardFrame">
          <Card.Body className="reviewCard">
            <Card.Title>{props.reviews[i].traineeName}</Card.Title>
            <div id="reviewCardStars">
              <Stars rating={props.reviews[i].rating} />
            </div>
            <Card.Text>{props.reviews[i].review}</Card.Text>
          </Card.Body>
        </Card>
      );
    }
    setReviews(tempReviews);
  }, [props.reviews]);

  const onClick = () => {
    const tempReviews = [];
    for (let i = 0; i < props.reviews.length && i < lastReviewIndex + 5; i++) {
      tempReviews.push(
        <Card className="cardFrame">
          <Card.Body className="reviewCard">
            <Card.Title>{props.reviews[i].traineeName}</Card.Title>
            <div id="reviewCardStars">
              <Stars rating={props.reviews[i].rating} />
            </div>
            <Card.Text>{props.reviews[i].review}</Card.Text>
          </Card.Body>
        </Card>
      );
    }
    setReviews(tempReviews);
    setLastReviewIndex(lastReviewIndex + 5);
  };
  return (
    <div id="reviewContainer">
      <h3>Reviews ({props.reviews.length})</h3>
      <div id="reviewContainer2">
        <Stack gap={3}>
          {reviews}{" "}
          {reviews.length < props.reviews.length ? (
            <Button id="seeMoreBtn" variant="light" size="lg" onClick={onClick}>
              see more
            </Button>
          ) : null}
        </Stack>
      </div>
    </div>
  );
};

export default ReviewCard;
