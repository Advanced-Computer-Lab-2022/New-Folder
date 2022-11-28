import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import RateAndReviewInstructor from "../../components/RateAndReviewInstructor/RateAndReviewInstructor";
import { fetchInstructorData } from "../../network";
import userTypes from "../../constants/UserTypes.json";
import { ReactSession } from "react-client-session";

const ViewInstructorProfile = () => {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [about, setAbout] = useState("");
  const [rating, setRating] = useState(0);
  const [ratingNo, setRatingNo] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);
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
      setCoursesCount(fetchedInstructorData.coursesCount);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (
    ReactSession.get("userType") === userTypes.trainee ||
    ReactSession.get("userType") === userTypes.corporateTrainee
  ) {
    return (
      <div>
        <ProfileCard
          name={name}
          img={img}
          rating={rating}
          about={about}
          coursesCount={coursesCount}
          ratingNo={ratingNo}
        />
        <RateAndReviewInstructor instructorID={instructorID} />
      </div>
    );
  }
  return null;
};

export default ViewInstructorProfile;
