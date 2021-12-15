import "./online.css";

import { Link } from "react-router-dom";

import ProfilePicture from "../profilePicture/ProfilePicture";

const Online = ({ user }) => {
  return (
    <Link
      to={"/profile/" + user.username}
      style={{ color: "black", textDecoration: "none" }}
    >
      <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
          <ProfilePicture
            userImage={user?.profilePicture}
            classname="rightbarProfileImg"
          />

          <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUsername">{user.username}</span>
      </li>
    </Link>
  );
};

export default Online;
