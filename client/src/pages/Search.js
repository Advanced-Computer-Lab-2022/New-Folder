import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard/CourseCard";
import {
  filterCoursesBySubject,
  filterCoursesByPrice,
  filterCoursesByRating,
} from "../utils/filters";

const Search = (props) => {
  const [filteredSearchResults, setFilteredSearchResults] = useState(
    props.searchResults
  );
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("");
  const [subject, setSubject] = useState("");

  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setRating("");
    setSubject("");
    setFilteredSearchResults(props.searchResults);
  };

  useEffect(() => {
    clearFilters();
  }, [props.searchResults]);

  const filter = async () => {
    let newSearchResults = props.searchResults;
    if (subject !== "") {
      newSearchResults = filterCoursesBySubject(subject, newSearchResults);
    }
    if (rating !== "") {
      newSearchResults = filterCoursesByRating(rating, newSearchResults);
    }
    if (minPrice !== "" && maxPrice !== "") {
      newSearchResults = await filterCoursesByPrice(
        minPrice,
        maxPrice,
        newSearchResults
      );
    }
    setFilteredSearchResults(newSearchResults);
  };

  return (
    <>
      <input
        type="number"
        value={minPrice}
        placeholder="min price"
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        value={maxPrice}
        placeholder="max price"
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <input
        type="number"
        value={rating}
        placeholder="rating"
        onChange={(e) => setRating(e.target.value)}
      />
      <input
        type="text"
        value={subject}
        placeholder="subject"
        onChange={(e) => setSubject(e.target.value)}
      />
      <button onClick={filter}>Filter</button>
      <button onClick={clearFilters}>Clear filters</button>
      <ul>
        {filteredSearchResults.map((result) => (
          <CourseCard course={result} />
        ))}
      </ul>
    </>
  );
};

export default Search;
