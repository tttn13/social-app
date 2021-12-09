import React from 'react'
import { hasWhiteSpace } from '../../utils/utils'
import { Search } from "@mui/icons-material";

const SearchForm = ({ resultsModalActive, handleSubmit, setSearchTerm }) => {
    
    return (
        <form
        className="searchbar"
        id="searchbar"
        onSubmit={(e) => handleSubmit(e)}
        style={{ borderRadius: `${resultsModalActive ? "15px 15px 0px 0px" : "20px" }` }}
      >
        <Search className="searchIcon" type="submit" />
        
        <input
          type="text"
          autoComplete="off"
          className="searchInput"
          placeholder="Search for a friend or post "
          onChange={(e) => {
              if (!hasWhiteSpace(e.target.value)) {
                setSearchTerm(e.target.value)
              } else {
                setSearchTerm(e.target.value.trim())
              }
          }}
        />
      </form> 
    )
}

export default SearchForm
