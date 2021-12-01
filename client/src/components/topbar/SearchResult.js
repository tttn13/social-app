import { useEffect, useState } from "react";
import NoteIcon from "@mui/icons-material/Note";
import "./SearchResult.css";
import { Link } from "react-router-dom";

const SearchResult = ({ res, closeDropDown }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [showImg, setShowImg] = useState(<NoteIcon />);
  const [scrollTo, setScrollTo] = useState("#");

  useEffect(() => {
    if (res.desc !== "No Results Found") {
      setScrollTo(`#post-${res._id}`);
    }
  }, [res]);

  useEffect(() => {
    if (res.profilePicture) {
      if (res.profilePicture.length > 0) {
        setShowImg(PF + res.profilePicture);
      } else if (res.profilePicture.length === 0) {
        setShowImg(PF + "person/noAvatar.png");
      }
    }
  }, [res, PF]);

  return (
    <>
      {res.profilePicture ? (
        <Link
          to={"/profile/" + res.username}
          style={{ color: "black", textDecoration: "none" }}
        >
          <li className="resultListItem" tabIndex="-1">
            <div className="resultImgContainer">
              <img src={showImg} alt="" className="resultImg" />
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
