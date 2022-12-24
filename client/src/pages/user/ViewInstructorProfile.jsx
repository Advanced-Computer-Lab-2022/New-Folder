import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader/PageHeader";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import RateAndReviewInstructor from "../../components/RateAndReviewInstructor/RateAndReviewInstructor";
import ReviewCard from "../../components/ReviewsCard/ReviewsCard";
import { fetchInstructorData } from "../../network";

const ViewInstructorProfile = () => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [ratingNo, setRatingNo] = useState(0);
  const [myRating, setMyRating] = useState(null);
  const [myReview, setMyReview] = useState(null);
  const [hasNewReview, setHasNewReview] = useState(false);
  const { isEnrolled, instructorID } = useParams();

  const fetchData = async () => {
    try {
      const fetchedInstructorData = await fetchInstructorData(instructorID);
      setName(
        `${fetchedInstructorData.firstName} ${fetchedInstructorData.lastName}`
      );
      setRating(fetchedInstructorData.totalRating);
      setRatingNo(fetchedInstructorData.ratingNo);
      setMyRating(fetchedInstructorData.myRating);
      setMyReview(fetchedInstructorData.myReview);

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
      <PageHeader pageName="Instructor profile" />
      <ProfileCard name={name} rating={rating} ratingNo={ratingNo} />
      {isEnrolled === "true" ? (
        <RateAndReviewInstructor
          instructorID={instructorID}
          rating={rating}
          ratingNo={ratingNo}
          setRating={setRating}
          setRatingNo={setRatingNo}
          setMyRating={setMyRating}
          myRating={myRating}
          setMyReview={setMyReview}
          myReview={myReview}
          hasNewReview={hasNewReview}
          setHasNewReview={setHasNewReview}
        />
      ) : null}
      <ReviewCard reviews={reviews} />
    </div>
  );
};

export default ViewInstructorProfile;
