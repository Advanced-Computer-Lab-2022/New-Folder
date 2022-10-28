import { useState } from "react";
import {
  filterCoursesBySubject,
  filterCoursesByPrice,
  filterCoursesByRating,
} from "../utils/filters";

const Search = (props) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("");
  const [subject, setSubject] = useState("");

  const filter = () => {
    let newSearchResults = props.searchResults;
    if (subject !== "") {
      newSearchResults = filterCoursesBySubject(subject, newSearchResults);
    }
    if (rating !== "") {
      newSearchResults = filterCoursesByRating(rating, newSearchResults);
      console.log(newSearchResults);
    }
    if (minPrice !== "" && maxPrice !== "") {
      newSearchResults = filterCoursesByPrice(
        minPrice,
        maxPrice,
        newSearchResults
      );
    }
    props.setSearchResults(newSearchResults);
  };

  return (
    <>
      <ul>
        {props.searchResults.map((result) => (
          <li>{result.name}</li>
        ))}
      </ul>
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
    </>
  );
};

export default Search;
