import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Search from "./pages/Search";

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
      </Routes>
    </>
  );
}

export default App;
