import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import RateAndReviewInstructor from "../../components/RateAndReviewInstructor/RateAndReviewInstructor";
import ReviewCard from "../../components/ReviewsCard/ReviewsCard";
import { fetchInstructorData } from "../../network";

const ViewInstructorProfile = () => {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [about, setAbout] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [ratingNo, setRatingNo] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);
  const [myRating, setMyRating] = useState(null);
  const [hasNewReview, setHasNewReview] = useState(false);
  const { isEnrolled, instructorID } = useParams();

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
      setReviews(fetchedInstructorData.ratings ?? []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [hasNewReview]);

  return (
    <div>
      <ProfileCard name={name} img={img} rating={rating} ratingNo={ratingNo} />
      {isEnrolled === "true" ? (
        <RateAndReviewInstructor
          instructorID={instructorID}
          rating={rating}
          ratingNo={ratingNo}
          setRating={setRating}
          setRatingNo={setRatingNo}
          setMyRating={setMyRating}
          myRating={myRating}
          hasNewReview={hasNewReview}
          setHasNewReview={setHasNewReview}
        />
      ) : null}
      <ReviewCard reviews={reviews} />
    </div>
  );
};

export default ViewInstructorProfile;
