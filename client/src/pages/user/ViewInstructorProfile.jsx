import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ReviewCard from "../../components/ReviewsCard/ReviewsCard";
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
      setImg(fetchedInstructorData.image);
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
    <div>
      <ProfileCard name={name} img={img} />
      <ReviewCard
        reviews={[
          { trainee: "Aya", review: "Great!" },
          { trainee: "Aya", review: "Great!" },
          { trainee: "Aya", review: "Great!" },
          { trainee: "Aya", review: "Great!" },
          { trainee: "Aya", review: "Great!" },
          { trainee: "Aya", review: "Great!" },
        ]}
      />
    </div>
  );
};

export default ViewInstructorProfile;
