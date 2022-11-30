import "./ProfileCard.css";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import ReactStars from "react-rating-stars-component";
import { useMemo } from "react";

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
      <div id="profileCardTop">
        <Image id="instructorImg" width={170} src={props.img} thumbnail />
      </div>
      <div id="instructorName">
        <h2>{props.name}</h2>
      </div>
      <div id="instructorRating">
        <span id="instructorRatingStars">
          <Stars />
        </span>
        <h6 id="instructorRatingNo">({props.ratingNo} ratings)</h6>
      </div>
    </Row>
  );
};

export default ProfileCard;
