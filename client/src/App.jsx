import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ReactSession } from "react-client-session";
import Explore from "./pages/user/Explore";
import Search from "./pages/user/Search";
import CreateCourse from "./pages/user/instructor/CreateCourse";
import Login from "./pages/Login";
import MyCourses from "./pages/user/instructor/MyCourses";
import Navbar from "./components/Navbar/Navbar";
import AddAdmin from "./pages/admin/AddAdmin";
import AddInstructor from "./pages/admin/AddInstructor";
import AddCorporateTrainee from "./pages/admin/AddCorporateTrainee";
import { useState } from "react";
import CourseDetails from "./pages/course/CourseDetails";
import AdminNavbar from "./components/Navbar/AdminNavbar";
import UserTypes from "./constants/UserTypes.json";
import Content from "./pages/course/Content/Content";
import Excercise from "./pages/course/Excercise/Excercise";
import ViewInstructorProfile from "./pages/user/ViewInstructorProfile";
import ForgetPassword from "./pages/user/ForgetPassword";
import ChangePassword from "./pages/user/ChangePassword";
import Container from "react-bootstrap/Container";
import MyProfile from "./pages/user/instructor/MyProfile";
import ResetPassword from "./pages/user/ResetPassword";
import EditSubtitle from "./pages/user/instructor/EditSubtitle";
ReactSession.setStoreType("sessionStorage");

function App() {
  const [country, setCountry] = useState(ReactSession.get("country") ?? "EG");
  const [userType, setUserType] = useState(ReactSession.get("userType") ?? "");
  ReactSession.set("country", country);
  ReactSession.set("userType", userType);
  return (
    <>
      {ReactSession.get("userType") === UserTypes.admin ? (
        <AdminNavbar setCountry={setCountry} />
      ) : (
        <Navbar setCountry={setCountry} />
      )}
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/myCourses" element={<MyCourses />} />
        <Route path="/search/:searchQuery" element={<Search />} />

        <Route path="/course/:courseId" element={<CourseDetails />} />
        <Route path="/addAdmin" element={<AddAdmin />} />
        <Route path="/AddInstructor" element={<AddInstructor />} />
        <Route path="/AddCorporateTrainee" element={<AddCorporateTrainee />} />
        <Route path="/CreateCourse" element={<CreateCourse />} />
        <Route path="/login" element={<Login setUserType={setUserType} />} />
        <Route path="/watch/:courseId" element={<Content />} />
        <Route path="/excercise/:excerciseID" element={<Excercise />} />

        <Route
          path="/viewInstructorProfile/:instructorID"
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
      </Routes>
    </>
  );
}

export default App;
