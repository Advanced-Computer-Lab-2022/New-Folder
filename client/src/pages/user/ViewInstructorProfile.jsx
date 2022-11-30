import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import RateAndReviewInstructor from "../../components/RateAndReviewInstructor/RateAndReviewInstructor";
import ReviewCard from "../../components/ReviewsCard/ReviewsCard";
import { fetchInstructorData } from "../../network";
import userTypes from "../../constants/UserTypes.json";
import { ReactSession } from "react-client-session";

const ViewInstructorProfile = () => {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [about, setAbout] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [ratingNo, setRatingNo] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);
  const [myRating, setMyRating] = useState(null);
  const { instructorID } = useParams();

  const fetchData = async () => {
    try {
      const fetchedInstructorData = await fetchInstructorData(instructorID);
      setName(
        `${fetchedInstructorData.firstName} ${fetchedInstructorData.lastName}`
      );
      setImg(fetchedInstructorData.image);
      setAbout(fetchedInstructorData.about);
      setRating(fetchedInstructorData.totalRating);
      setRatingNo(fetchedInstructorData.ratingNo);
      setCoursesCount(fetchedInstructorData.coursesCount);
      setMyRating(fetchedInstructorData.myRating);
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
      <ProfileCard name={name} img={img} rating={rating} ratingNo={ratingNo} />
      {ReactSession.get("userType") === userTypes.trainee ||
      ReactSession.get("userType") === userTypes.corporateTrainee ? (
        <RateAndReviewInstructor
          instructorID={instructorID}
          rating={rating}
          ratingNo={ratingNo}
          setRating={setRating}
          myRating={myRating}
        />
      ) : null}
      <ReviewCard reviews={reviews} />
    </div>
  );

  return null;
};

export default ViewInstructorProfile;
