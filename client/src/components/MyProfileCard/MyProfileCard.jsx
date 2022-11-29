import "./MyProfileCard.css";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import ReactStars from "react-rating-stars-component";
import { useMemo } from "react";

const MyProfileCard = (props) => {
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
    <Row id="myProfileMain">
      <div id="myProfileTop">
        <Image id="myImg" width={170} src={props.img} thumbnail />
      </div>
      <div id="myName">
        <h2>{props.name}</h2>
      </div>
      <div id="myRating">
        <span id="myRatingStars">
          <Stars />
        </span>
        <h6 id="myRatingNo">({props.ratingNo} ratings)</h6>
      </div>
    </Row>
  );
};

export default MyProfileCard;
