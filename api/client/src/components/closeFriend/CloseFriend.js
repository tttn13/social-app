import "./closeFriend.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ProfilePicture from "../profilePicture/ProfilePicture";

const CloseFriend = ({ user, style }) => {
  const [defaultStyle, setDefaultStyle] = useState({
    color: "black",
    textDecoration: "none",
  });

  useEffect(() => {
    if (style) {
      setDefaultStyle(style);
    }
  }, [style]);

  return (
    <Link to={"/profile/" + user?.username} style={defaultStyle}>
      <li className="sidebarFriend">
        <ProfilePicture
          userImage={user?.profilePicture}
          classname="sidebarFriendImg"
        />
        <span className="sidebarFriendName">{user?.username}</span>
      </li>
    </Link>
  );
};

export default CloseFriend;
