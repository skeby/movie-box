import "../index.css";

const SearchBar = ({ onSearch, query }) => {
  // const debouncedQuery = useDebounce(query, 600);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => {
          e.preventDefault();
          onSearch(e.target.value);
        }}
        type="search"
        id="search-bar"
        className="form-control rounded"
        placeholder="What do you want to watch?"
        aria-label="Search"
        aria-describedby="search-addon"
      />
      <button type="submit" className="search-icon">
        {/* <FontAwesomeIcon icon={faSearch} /> */}
      </button>
    </div>
  );
};

export default SearchBar;
