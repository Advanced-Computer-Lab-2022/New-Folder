import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Search from "./pages/Search";
import CreateCourse from "./pages/CreateCourse";

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
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/search" element={<Search />} />
        <Route path="/CreateCourse" element={<CreateCourse />} />
      </Routes>
    </>
  );
}

export default App;
