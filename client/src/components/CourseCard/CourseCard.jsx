import { getPrice, fetchInstructorData } from "../../network";
import { useState, useEffect } from "react";
import { ReactSession } from "react-client-session";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "./CourseCard.css";

function CourseCard(props) {
  const [price, setPrice] = useState("");
  const [priceBeforeDiscount, setPriceBeforeDiscount] = useState(null);
  const [currency, setCurrency] = useState("");

  const navigate = useNavigate();

  const fetchPrice = async () => {
    try {
      const fetchedPrice = await getPrice({
        magnitude: props.course.price.finalPrice,
        currency: props.course.price.currency,
      });
      let priceStr = fetchedPrice.split(" ");
      setPrice(priceStr[0]);
      setCurrency(priceStr[1]);
      if (props.course.price.hasPromotion) {
        const fetchedPriceBeforeDiscount = await getPrice({
          magnitude: props.course.price.priceBeforePromotion,
          currency: props.course.price.currency,
        });
        priceStr = fetchedPriceBeforeDiscount.split(" ");
        setPriceBeforeDiscount(priceStr[0]);
        setCurrency(priceStr[1]);
      } else {
        setPriceBeforeDiscount(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPrice();
  }, [ReactSession.get("country"), props.course]);

  return (
    <Card
      sx={{ maxWidth: 250, minWidth: 250 }}
      onClick={(e) => navigate("/course/" + props.course._id)}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          width="250"
          image={
            props.course?.image?.length > 0
              ? props.course.image
              : "https://www.pngkey.com/png/detail/350-3500680_placeholder-open-book-silhouette-vector.png"
          }
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.course.name}
          </Typography>
          <Typography variant="body2">
            <p className="instructor__name">{props.course.instructorName}</p>
            <div className="card__details__price__rating">
              <div className="card__details__rating">
                <i class="bi bi-star-fill"></i>
                <p className="card__rating">{props.course.totalRating ?? 0}</p>
                <span className="card__rating__number">
                  (
                  {(props.course.ratings?.length ?? "0") +
                    (props.course.ratings?.length == 1
                      ? " rating"
                      : " ratings")}
                  )
                </span>
              </div>

              <h6 className="card__price">
                {price}
                <span id="courseCardCurrency">{currency}</span>
              </h6>
            </div>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CourseCard;
