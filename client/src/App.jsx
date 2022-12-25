import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ReactSession } from "react-client-session";
import Explore from "./pages/user/Explore/Explore";
import Search from "./pages/user/Search";
import CreateCourse from "./pages/user/instructor/CreateCourse";
import Login from "./pages/Login/Login";
import MyCourses from "./pages/user/instructor/MyCourses/MyCourses";
import Navbar from "./components/Navbar/Navbar";
import { useState } from "react";
import CourseDetails from "./pages/course/CourseDetails";
import AdminNavbar from "./components/Navbar/AdminNavbar";
import UserTypes from "./constants/UserTypes.json";
import Content from "./pages/course/Content/Content";
import Excercise from "./pages/course/Excercise/Excercise";
import ViewInstructorProfile from "./pages/user/ViewInstructorProfile";
import ForgetPassword from "./pages/user/ForgetPassword";
import ChangePassword from "./pages/user/ChangePassword";
import MyProfile from "./pages/user/instructor/MyProfile";
import ResetPassword from "./pages/user/ResetPassword";
import EditSubtitle from "./pages/user/instructor/EditSubtitle";
import MyProblems from "./pages/user/MyProblems/MyProblems";
import Reports from "./pages/admin/Reports";
import AddUser from "./pages/admin/AddUser";
import Earnings from "./pages/user/instructor/Earnings";
import EnrolledCourses from "./pages/user/EnrolledCourses";
import AccessRequests from "./pages/admin/AccessRequests";
import Signup from "./pages/Signup";
import Refunds from "./pages/admin/Refunds";
ReactSession.setStoreType("sessionStorage");

function App() {
  const [country, setCountry] = useState(ReactSession.get("country") ?? "EG");
  const [userType, setUserType] = useState(ReactSession.get("userType") ?? "");
  ReactSession.set("country", country);
  ReactSession.set("userType", userType);
  return (
    <>
      {ReactSession.get("userType") === UserTypes.admin ? (
        <AdminNavbar setCountry={setCountry} setUserType={setUserType} />
      ) : (
        <Navbar setCountry={setCountry} setUserType={setUserType} />
      )}
      <div id="mainApp">
        <Routes>
          <Route path="/" element={<Explore />} />
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
          <Route path="/refunds" element={<Refunds />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/AccessRequests" element={<AccessRequests />} />
          <Route path="/earnings" element={<Earnings />} />
          <Route path="/enrolledCourses" element={<EnrolledCourses />} />
          <Route
            path="/signup"
            element={<Signup setUserType={setUserType} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
