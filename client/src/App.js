import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Navbar from "./components/Navbar/Navbar";
import { useState } from "react";

function App() {
  const [country, setCountry] = useState("Egypt");
  const [searchResults, setSearchResults] = useState([]);
  return (
    <>
      <Navbar setSearchResults={setSearchResults} />
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route
          path="/search"
          element={
            <Search
              searchResults={searchResults}
              setSearchResults={setSearchResults}
            />
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
