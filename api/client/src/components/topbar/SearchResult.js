import { useEffect, useState } from "react";
import NoteIcon from "@mui/icons-material/Note";
import "./SearchResult.css";
import { Link } from "react-router-dom";
import ProfilePicture from "../profilePicture/ProfilePicture";

const SearchResult = ({ res, closeDropDown }) => {
  const [scrollTo, setScrollTo] = useState("#");

  useEffect(() => {
    if (res.desc !== "No Results Found") {
      setScrollTo(`#post-${res._id}`);
    }
  }, [res]);

  return (
    <>
      {res.profilePicture ? (
        <Link
          to={"/profile/" + res.username}
          style={{ color: "black", textDecoration: "none" }}
        >
          <li className="resultListItem" tabIndex="-1">
            <div className="resultImgContainer">
              <ProfilePicture userImage={res?.profilePicture} classname="resultImg" />
            </div>
            <span className="resultText">{res?.username}</span>
          </li>
        </Link>
      ) : (
        
        <a href={scrollTo} style={{ color: "black", textDecoration: "none" }}> 
          <li className="resultListItem" tabIndex="-1">
            <div className="resultImgContainer">
              <NoteIcon />
            </div>
            <span className="resultText" onClick={() => closeDropDown()}>
              {res?.username || res?.desc}
            </span>
          </li>
       </a> 
      )}
    </>
  );
};

export default SearchResult;
