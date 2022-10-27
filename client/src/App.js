import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Search from "./pages/Search";
import CreateCourse from "./pages/CreateCourse";
import Login from "./pages/Login";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Explore</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/instructor/CreateCourse">createCourse</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/search" element={<Search />} />
        <Route path="/instructor/CreateCourse" element={<CreateCourse />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Navbar></Navbar>
    </>
  );
}

export default App;
