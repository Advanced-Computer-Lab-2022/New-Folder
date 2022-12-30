import "./CourseReviewCard.css";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useEffect } from "react";
import ReactStars from "react-rating-stars-component";

const CourseReviewCard = (props) => {
  const [lastReviewIndex, setLastReviewIndex] = useState(3);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const tempReviews = [];
    for (let i = 0; i < props.reviews.length && i < lastReviewIndex; i++) {
      tempReviews.push(
        <Card className="courseCardFrame">
          <Card.Body className="courseReviewCard">
            <Card.Title>{props.reviews[i].traineeName}</Card.Title>
            <div id="reviewCardStars">
              <ReactStars
                count={5}
                size={25}
                isHalf={true}
                activeColor="#ffd700"
                value={props.reviews[i].rating ?? 0}
                edit={false}
              />
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
        <Card className="courseCardFrame">
          <Card.Body className="courseReviewCard">
            <Card.Title>{props.reviews[i].traineeName}</Card.Title>
            <ReactStars
              count={5}
              size={50}
              isHalf={true}
              activeColor="#ffd700"
              value={props.reviews[i].rating ?? 0}
              edit={false}
            />
            <Card.Text>{props.reviews[i].review}</Card.Text>
          </Card.Body>
        </Card>
      );
    }
    setReviews(tempReviews);
    setLastReviewIndex(lastReviewIndex + 5);
  };
  return (
    <div id="courseReviewContainer">
      <div id="courseReviewInnerContainer">
        <Stack gap={3}>
          {reviews}{" "}
          {reviews.length < props.reviews.length ? (
            <Button
              id="courseSeeMoreBtn"
              variant="light"
              size="lg"
              onClick={onClick}
            >
              see more
            </Button>
          ) : null}
        </Stack>
      </div>
    </div>
  );
};

export default CourseReviewCard;
