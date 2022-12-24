import "./ProfileCard.css";
import Row from "react-bootstrap/Row";
import ReactStars from "react-rating-stars-component";
import { useMemo } from "react";
import { Stack } from "react-bootstrap";

const ProfileCard = (props) => {
  let Stars = useMemo(() => {
    return () => (
      <ReactStars
        count={5}
        size={40}
        isHalf={true}
        activeColor="#ffd700"
        value={props.rating}
        edit={false}
      />
    );
  }, [props.rating]);

  return (
    <Row id="profileCardMain">
      <Stack gap={1}>
        <div id="instructorName">
          <h2>{props.name}</h2>
        </div>
        <div id="instructorRating">
          <span id="instructorRatingStars">
            <Stars />
          </span>
          <h6 id="instructorRatingNo">({props.ratingNo} ratings)</h6>
        </div>
      </Stack>
    </Row>
  );
};

export default ProfileCard;
