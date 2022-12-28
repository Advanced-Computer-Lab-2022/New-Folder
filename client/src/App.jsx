import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ReactSession } from "react-client-session";
import Explore from "./pages/user/Explore/Explore";
import Search from "./pages/user/Search";
import Filter from "./pages/user/Filter";
import CreateCourse from "./pages/user/instructor/CreateCourse/CreateCourse";
import Login from "./pages/Login/Login";
import MyCourses from "./pages/user/instructor/MyCourses/MyCourses";
import Navbar from "./components/NavbarV2/Navbar";
import { useState } from "react";
import CourseDetails from "./pages/course/CourseDetails";
import UserTypes from "./constants/UserTypes.json";
import Content from "./pages/course/Content/Content";
import Excercise from "./pages/course/Excercise/Excercise";
import ViewInstructorProfile from "./pages/user/ViewInstructorProfile";
import ForgetPassword from "./pages/password/ForgetPassword";
import ChangePassword from "./pages/password/ChangePassword";
import MyProfile from "./pages/user/instructor/MyProfile";
import ResetPassword from "./pages/password/ResetPassword";
import EditSubtitle from "./pages/user/instructor/EditSubtitle/EditSubtitle";
import MyProblems from "./pages/user/MyProblems/MyProblems";
import AddUser from "./pages/admin/AddUser/AddUser";
import Earnings from "./pages/user/instructor/Earnings";
import EnrolledCourses from "./pages/user/EnrolledCourses";
import Signup from "./pages/Signup/Signup";
import AdminHome from "./pages/admin/AdminHome/AdminHome";
import SetpromotionPage from "./pages/admin/SetpromotionPage";
ReactSession.setStoreType("sessionStorage");

function App() {
  const [country, setCountry] = useState(ReactSession.get("country") ?? "EG");
  const [userType, setUserType] = useState(ReactSession.get("userType") ?? "");
  ReactSession.set("country", country);
  ReactSession.set("userType", userType);
  return (
    <>
      <Navbar setCountry={setCountry} setUserType={setUserType} />
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/allCourses" element={<Filter />} />
        <Route path="/myCourses" element={<MyCourses />} />
        <Route path="/search/:searchQuery" element={<Search />} />

        <Route path="/course/:courseId" element={<CourseDetails />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/CreateCourse" element={<CreateCourse />} />
        <Route path="/login" element={<Login setUserType={setUserType} />} />
        <Route path="/watch/:courseId" element={<Content />} />
        <Route path="/excercise/:excerciseID" element={<Excercise />} />

        <Route
          path="/viewInstructorProfile/:isEnrolled/:instructorID"
          element={<ViewInstructorProfile />}
        />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/myProfile" element={<MyProfile />} />
        <Route
          path="/resetPassword/:userID/:token"
          element={<ResetPassword />}
        />
        <Route
          path="/editSubtitle/:courseID/:subtitleID"
          element={<EditSubtitle />}
        />
        <Route path="/myProblems" element={<MyProblems />} />
        <Route path="/adminHome" element={<AdminHome />} />
        <Route path="/earnings" element={<Earnings />} />
        <Route path="/enrolledCourses" element={<EnrolledCourses />} />
        <Route path="/setPromotion" element={<SetpromotionPage />} />
        <Route path="/signup" element={<Signup setUserType={setUserType} />} />
      </Routes>
    </>
  );
}

export default App;
