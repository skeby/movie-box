import React, { useState } from "react";
import "../index.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSubmit(event);
    }
  };


  return (
    <form onSubmit={handleSubmit} id="search-form">
      <input
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        type="search"
        id="search-bar"
        className="form-control rounded"
        placeholder="What do you want to watch?"
        aria-label="Search"
        aria-describedby="search-addon"
      />
      <button type="submit" className="search-icon">
        <FontAwesomeIcon icon={faSearch} className="my-icon" />
      </button>
    </form>
  );
};

export default SearchBar;
