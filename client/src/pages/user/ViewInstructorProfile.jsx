import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchInstructorData } from "../../network";

const ViewInstructorProfile = () => {
  const [name, setName] = useState("");
  const [img, setImg] = useState(""); //will be used later when enhancing the frontend
  const [about, setAbout] = useState("");
  const [rating, setRating] = useState(0);
  const [ratingNo, setRatingNo] = useState(0);
  const [reviews, setReviews] = useState([]);
  const { instructorID } = useParams();

  const fetchData = async () => {
    try {
      const fetchedInstructorData = await fetchInstructorData(instructorID);
      setName(
        `${fetchedInstructorData.firstName} ${fetchedInstructorData.lastName}`
      );
      setImg(fetchedInstructorData.img);
      setAbout(fetchedInstructorData.about);
      setRating(fetchedInstructorData.rating);
      setRatingNo(fetchedInstructorData.ratingNo);
      setReviews(fetchedInstructorData.reviews);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>{name}</h1>
    </>
  );
};

export default ViewInstructorProfile;
