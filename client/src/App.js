import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ReactSession } from "react-client-session";
import Explore from "./pages/Explore";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Navbar from "./components/Navbar/Navbar";
import { useState } from "react";

ReactSession.setStoreType("sessionStorage");

function App() {
  const [country, setCountry] = useState("EG");
  const [searchResults, setSearchResults] = useState([]);
  const [userType, setUserType] = useState("Guest");
  ReactSession.set("country", country);
  ReactSession.set("userType", userType);
  return (
    <>
      <Navbar setSearchResults={setSearchResults} setCountry={setCountry} />
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
        <Route path="/login" element={<Login setUserType={setUserType} />} />
      </Routes>
    </>
  );
}

export default App;
