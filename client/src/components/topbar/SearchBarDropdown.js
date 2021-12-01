import SearchResult from "./SearchResult";
import "./SearchBarDropdown.css";

const SearchBarDropdown = ({ searchResults, handleCloseBtn }) => {

    const noResult = {
        desc: "No Results Found"
    }

  return (
    <div  className="searchbar-dropdown-content"> 
      <div className="dropdown-content-top">
        <h3>Search Results</h3>
        <span className="closeBtn" onClick={handleCloseBtn}>
          &times;
        </span>
      </div>
      <ul className="dropdown-content-body">
        {searchResults.length === 0 
        ?  <SearchResult key={0} res={noResult} closeDropDown={handleCloseBtn}/>
        :  searchResults.map((res) => <SearchResult key={res._id} res={res} closeDropDown={handleCloseBtn}/>)}
      </ul>
    </div>
  );
};

export default SearchBarDropdown;
