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
import { Stack } from "react-bootstrap";

function CourseCard(props) {
  const [price, setPrice] = useState("");
  const [priceBeforeDiscount, setPriceBeforeDiscount] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [currency, setCurrency] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchPrice = async () => {
    setLoading(true);
    try {
      const fetchedPrice = await getPrice({
        magnitude: props.course.price.finalPrice,
        currency: props.course.price.currency,
      });
      let priceStr = fetchedPrice.split(" ");
      setDuration(props.course.duration);
      setPrice(priceStr[0]);
      setCurrency(priceStr[1]);
      if (props.course.price.hasPromotion) {
        const fetchedPriceBeforeDiscount = await getPrice({
          magnitude: props.course.price.priceBeforePromotion,
          currency: props.course.price.currency,
        });
        priceStr = fetchedPriceBeforeDiscount.split(" ");
        setPriceBeforeDiscount(priceStr[0]);
        setDiscount(props.course.price.discount);
        setCurrency(priceStr[1]);
      } else {
        setPriceBeforeDiscount(null);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrice();
  }, [ReactSession.get("country"), props.course]);

  return (
    <Card
      id="courseCardMain"
      sx={{ maxWidth: 230, minWidth: 230 }}
      onClick={(e) => navigate("/course/" + props.course.id)}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          width="230"
          image={
            props.course?.image?.length > 0
              ? props.course.image
              : "https://www.pngkey.com/png/detail/350-3500680_placeholder-open-book-silhouette-vector.png"
          }
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {props.course.name}
          </Typography>
          <Typography variant="body2">
            <Stack>
              <h6>{props.course.instructorName}</h6>
              <h6>{duration}</h6>
            </Stack>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CourseCard;
