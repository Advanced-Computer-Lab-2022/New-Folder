import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ReactSession } from "react-client-session";
import Explore from "./pages/Explore";
import Search from "./pages/Search";
import CreateCourse from "./pages/CreateCourse";
import Login from "./pages/Login";
import MyCourses from "./pages/MyCourses";
import Navbar from "./components/Navbar/Navbar";
import AddAdmin from "./pages/AddAdmin";
import AddInstructor from "./pages/AddInstructor";
import AddCorporateTrainee from "./pages/AddCorporateTrainee";
import { useState } from "react";
import CourseDetails from "./pages/CourseDetails";
import AdminNavbar from "./components/Navbar/AdminNavbar";

ReactSession.setStoreType("sessionStorage");

function App() {
  const [country, setCountry] = useState(ReactSession.get("country") ?? "EG");
  const [searchResults, setSearchResults] = useState([]);
  const [userType, setUserType] = useState(ReactSession.get("userType") ?? "");
  ReactSession.set("country", country);
  ReactSession.set("userType", userType);
  return (
    <>
      {ReactSession.get("userType") === "admin" ? (
        <AdminNavbar
          setSearchResults={setSearchResults}
          setCountry={setCountry}
        />
      ) : (
        <Navbar setSearchResults={setSearchResults} setCountry={setCountry} />
      )}
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/myCourses" element={<MyCourses />} />
        <Route
          path="/search"
          element={
            <Search
              searchResults={searchResults}
              setSearchResults={setSearchResults}
            />
          }
        />

        <Route path="/courses" element={<CourseDetails />} />
        <Route path="/addAdmin" element={<AddAdmin />} />
        <Route path="/AddInstructor" element={<AddInstructor />} />
        <Route path="/AddCorporateTrainee" element={<AddCorporateTrainee />} />
        <Route path="/CreateCourse" element={<CreateCourse />} />
        <Route path="/login" element={<Login setUserType={setUserType} />} />
      </Routes>
    </>
  );
}

export default App;
