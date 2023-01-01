import { getPrice, fetchInstructorData } from "../../network";
import { useState, useEffect } from "react";
import { ReactSession } from "react-client-session";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Rating } from "@mui/material";
import "./CourseCard.css";
import { Badge, Spinner, Stack } from "react-bootstrap";
import { MdPayments, MdOutlineStar } from "react-icons/md";
import { RiPlayList2Fill, RiBookReadFill } from "react-icons/ri";
import Placeholder from "react-bootstrap/Placeholder";
import userTypes from "../../constants/UserTypes.json";

function CourseCard(props) {
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState(null);
  const [currency, setCurrency] = useState("");
  const [duration, setDuration] = useState("");
  const [subject, setSubject] = useState("");
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
      setSubject(props.course.subject);
      setPrice(priceStr[0]);
      setCurrency(priceStr[1]);
      if (props.course.price.hasPromotion) {
        setDiscount(props.course.price.discount);
      } else {
        setDiscount(null);
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
      sx={{
        maxWidth: 230,
        minWidth: 230,
        maxHeight: 326,
        minHeight: 326,
      }}
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
        {loading ? (
          <CardContent>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={5} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={10} />
              <Placeholder xs={10} />
              <Placeholder xs={10} />
              <Placeholder xs={10} />
            </Placeholder>
          </CardContent>
        ) : (
          <CardContent>
            <Typography variant="h5" component="span">
              {props.course.name}
            </Typography>
            <Typography variant="body2">
              <Stack gap={1}>
                <h6 className="courseCardItem blueTxt">
                  {props.course.instructorName}{" "}
                  {props.course?.published !== null &&
                  props.course?.published !== undefined &&
                  !props.course?.published ? (
                    <Badge bg="secondary" pill>
                      Unpublished
                    </Badge>
                  ) : null}
                </h6>
                <h6 className="courseCardItem">
                  <RiPlayList2Fill size={16} color="#100F0F" /> {duration}
                </h6>
                <h6 id="courseCardRating" className="courseCardItem">
                  <MdOutlineStar size={20} color="#ffd700" />{" "}
                  <span id="courseCardTxt">
                    {props.course.totalRating}{" "}
                    <span className="greyTxt">{`(${props.course.ratingsCount} ${
                      props.course.ratingsCount === 1 ? "rating" : "ratings"
                    })`}</span>
                  </span>
                </h6>
                {ReactSession.get("userType") === userTypes.corporateTrainee ? (
                  <h6 className="courseCardItem">
                    <RiBookReadFill size={16} color="#100F0F" /> {subject}
                  </h6>
                ) : (
                  <h6 className="courseCardItem">
                    <MdPayments size={17} color="#100F0F" />{" "}
                    <span id="courseCardTxt">
                      {price} <span className="greyTxt">{currency}</span>
                      {discount ? <span>{` (-${discount}%)`}</span> : null}
                    </span>
                  </h6>
                )}
              </Stack>
            </Typography>
          </CardContent>
        )}
      </CardActionArea>
    </Card>
  );
}

export default CourseCard;
