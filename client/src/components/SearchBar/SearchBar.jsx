import "./SearchBar.css";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/search/${searchQuery}`);
    } else {
      e.stopPropagation();
    }
  };
  return (
    <Form className="d-flex" id="searchBar" onSubmit={submit}>
      <Form.Control
        type="search"
        placeholder="Search all courses"
        className="me-2"
        style={{ minWidth: "320px" }}
        aria-label="Search"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button
        type="submit"
        style={{ fontSize: "1.3em " }}
        variant="outline-light"
      >
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
