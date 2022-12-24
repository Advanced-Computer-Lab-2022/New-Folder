import { useState, useEffect } from "react";
import ReviewCard from "../../../components/ReviewsCard/ReviewsCard";
import ProfileCard from "../../../components/ProfileCard/ProfileCard";
import { getMyProfile } from "../../../network";
import EditMyProfileForm from "../../../components/EditMyProfileForm/EditMyProfileForm";
import userTypes from "../../../constants/UserTypes.json";
import { ReactSession } from "react-client-session";
import PageHeader from "../../../components/PageHeader/PageHeader";

const MyProfile = () => {
  const [name, setName] = useState("");
  const [about, setAbout] = useState(null);
  const [email, setEmail] = useState(null);
  const [rating, setRating] = useState(0);
  const [ratingNo, setRatingNo] = useState(0);
  const [reviews, setReviews] = useState([]);

  const fetchData = async () => {
    try {
      const myProfileData = await getMyProfile();
      setName(`${myProfileData.firstName} ${myProfileData.lastName}`);
      setAbout(myProfileData.about?.length === 0 ? null : myProfileData.about);
      setRating(myProfileData.totalRating);
      setRatingNo(myProfileData.ratings.length);
      setEmail(myProfileData.email?.length === 0 ? null : myProfileData.email);
      setReviews(myProfileData.ratings ?? []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (ReactSession.get("userType") === userTypes.instructor) {
    return (
      <div>
        <PageHeader pageName="My profile" />
        <ProfileCard name={name} rating={rating} ratingNo={ratingNo} />
        <EditMyProfileForm
          email={email}
          setEmail={setEmail}
          about={about}
          setAbout={setAbout}
        />
        <ReviewCard reviews={reviews} />
      </div>
    );
  }
  return null;
};

export default MyProfile;
