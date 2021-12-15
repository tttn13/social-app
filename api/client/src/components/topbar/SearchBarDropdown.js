import "./SearchBarDropdown.css";

import { useRef } from "react";

import { useOutsideAlerter } from "../customHooks/useOutsideAlerter";
import SearchResult from "./SearchResult";

const SearchBarDropdown = ({ searchResults, setResultsModalActive }) => {
  const noResult = {
    desc: "No Results Found",
  };

  const resultsRef = useRef();

  useOutsideAlerter({
    ref: resultsRef,
    setModalActive: setResultsModalActive,
  });

  const handleCloseBtn = () => {
    setResultsModalActive(false)
  }
  return (
    <div className="searchbar-dropdown-content" ref={resultsRef}>
      <div className="dropdown-content-top">
        <h3>Search Results</h3>
        <span className="closeBtn" onClick={handleCloseBtn}>
          &times;
        </span>
      </div>
      <ul className="dropdown-content-body">  
        {searchResults.length === 0 ? (
          <SearchResult key={0} res={noResult} closeDropDown={handleCloseBtn} />
        ) : (
          searchResults.map((res) => (
            <SearchResult
              key={res._id}
              res={res}
              closeDropDown={handleCloseBtn}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default SearchBarDropdown;
