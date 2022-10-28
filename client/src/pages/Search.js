const Search = (props) => {
  return (
    <ul>
      {props.searchResults.map((result) => (
        <li>{result.name}</li>
      ))}
    </ul>
  );
};

export default Search;
