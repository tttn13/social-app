import "./closeFriend.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const CloseFriend = ({ user, style }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [defaultStyle, setDefaultStyle] = useState({ 
    color:"black" , 
    textDecoration: "none" })

  useEffect(() => {
    if (style) {
      setDefaultStyle(style)
    }
  }, [style])
  
  return (
    <Link to={"/profile/" + user.username} style={defaultStyle}>
      <li className="sidebarFriend">
        <img
          src={
            user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"
          }
          alt=""
          className="sidebarFriendImg"
        />
        <span className="sidebarFriendName">{user.username}</span>
      </li>
    </Link>
  );
};

export default CloseFriend;
