import { getPrice, fetchInstructorData } from "../../network";
import { useState, useEffect } from "react";
import { ReactSession } from "react-client-session";
import { useNavigate } from "react-router-dom";
import "./CourseCard.css";

function CourseCard(props) {
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");

  const navigate = useNavigate();

  const fetchPrice = async () => {
    try {
      const fetchedPrice = await getPrice(props.course.price);
      const priceStr = fetchedPrice.split(" ");
      setPrice(priceStr[0]);
      setCurrency(priceStr[1]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPrice();
  }, [ReactSession.get("country"), props.course]);

  return (
    <div
      className="card"
      onClick={(e) => navigate("/course/" + props.course._id)}
    >
      <div className="card__body">
        <img
          className="card__image"
          src={
            props.course.image === ""
              ? "../../public/assets/course/course-default.png"
              : props.course.image
          }
        />
        <div className="card__instructor">
          <p className="instructor__name">
            {props.course.instructorInfo == undefined
              ? "unknown"
              : props.course.instructorInfo.instructorName}
          </p>
        </div>

        <div className="card__details">
          <div className="card__details__title">
            <h4 className="card__title">{props.course.name}</h4>
            <span className="card__subject">{props.course.subject}</span>
          </div>

          <div className="card__details__description">
            <p className="card__description">
              {props.course.description ?? "No description"}
            </p>
          </div>

          <div className="card__details__price__rating">
            <div className="card__details__rating">
              <i class="bi bi-star-fill"></i>
              <p className="card__rating">{props.course.totalRating ?? 0}</p>
              <span className="card__rating__number">
                (
                {props.course.ratings.length +
                  (props.course.ratings.length == 1 ? " rating" : " ratings")}
                )
              </span>
            </div>

            <p className="card__price">
              {price} <sup>{currency}</sup>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
