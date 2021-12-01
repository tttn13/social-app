import { Add, Remove } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useGetFriends } from "../customHooks/useGetFriends";
import { handleFollow, handleUnfollow } from "../../context/AsyncActions";

const RightbarInProfilePage = ({ selectedUser, currentUser }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);
  const { friends: userFriends } = useGetFriends(selectedUser);

  useEffect(() => {
    if (currentUser) {
      setFollowed(currentUser.followings.includes(selectedUser?._id));
    }
    return () => {
      setFollowed(false)
    }
  }, [currentUser, selectedUser]);

  const handleClick = async () => {
    try {
      if (followed) {
        handleUnfollow(currentUser._id, selectedUser._id, dispatch);
      } else {
        handleFollow(currentUser._id, selectedUser._id, dispatch);
      }
      setFollowed(!followed);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {selectedUser.username !== currentUser.username && (
        <button className="rightbarFollowButton" onClick={handleClick}>
          {followed ? "Unfollow" : "Follow"}
          {followed ? <Remove /> : <Add />}
        </button>
      )}
      <h4 className="rightbarTitle">User information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">{selectedUser.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">{selectedUser.from}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarInfoValue">
            {selectedUser.relationship === 1
              ? "Single"
              : selectedUser.relationship === 1
              ? "Married"
              : "-"}
          </span>
        </div>
      </div>

      <h4 className="rightbarTitle">User Friends</h4>
      <div className="rightbarFollowings">
        {userFriends.length > 0 &&
          userFriends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
              key={friend._id}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default RightbarInProfilePage;
