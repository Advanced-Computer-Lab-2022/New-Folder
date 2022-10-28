import "./App.css";
import { Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Search from "./pages/Search";
import CreateCourse from "./pages/CreateCourse";
import Login from "./pages/Login";
import Navbar from "./components/Navbar/Navbar";
import AddAdmin from "./pages/AddAdmin";
import AddInstructor from "./pages/AddInstructor";
import AddCorporateTrainee from "./pages/AddCorporateTrainee";
import { useState } from "react";

function App() {
  const [searchResults, setSearchResults] = useState("");
  return (
    <>
      <Navbar setSearchResults={setSearchResults} />
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route
          path="/search"
          element={<Search searchResults={searchResults} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/addAdmin" element={<AddAdmin />} />
        <Route path="/AddInstructor" element={<AddInstructor />} />
        <Route path="/AddCorporateTrainee" element={<AddCorporateTrainee />} />
        <Route path="/CreateCourse" element={<CreateCourse />} />
      </Routes>
    </>
  );
}

export default App;
