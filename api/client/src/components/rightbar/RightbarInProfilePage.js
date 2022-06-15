import { Person,PersonAddAlt } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { handleAddFriendBtn } from "../../context/AsyncActions";
import { AuthContext } from "../../context/AuthContext";
import { useFetchUser } from "../customHooks/useFetchUser";
import { useGetFriends } from "../customHooks/useGetFriends";
import ProfilePicture from "../profilePicture/ProfilePicture";

const RightbarInProfilePage = ({ selectedUsername, currentUser }) => {
  const { dispatch } = useContext(AuthContext);
  const { user: currUser } = useFetchUser({ userId: currentUser._id });
  const { user: selectedUser } = useFetchUser({ username: selectedUsername });
  const [friended, setFriended] = useState(
    currUser?.friends?.includes(selectedUser?._id)
  );
  const { friends: userFriends } = useGetFriends(selectedUser);

  useEffect(() => {
    if (currUser?.friends?.includes(selectedUser?._id)) {
      setFriended(true);
    }
  }, [selectedUser, currUser]);

  const handleClick = async () => {
    await handleAddFriendBtn({
      currentUserId: currUser._id,
      selectedUserId: selectedUser._id,
      followedSelectedUser: friended,
      dispatch,
    });

    setFriended(!friended);
  };

  return (
    <>
      {selectedUser.username !== currUser.username && (
        <button
        className="rightbarFollowButton"
        onClick={(e) => {
          e.preventDefault();
          handleClick(e);
        }}
      >
        {friended ? <> <Person fontSize="small" />Unfriend</> : <><PersonAddAlt fontSize="small" />Friend</>}
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
              : selectedUser.relationship === 2
              ? "Married"
              : "-"}
          </span>
        </div>
      </div>

      <h4 className="rightbarTitle">User Friends</h4>
      <div className="rightbarFollowings">
        {userFriends &&
          userFriends.length > 0 &&
          userFriends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
              key={friend._id}
            >
              <div className="rightbarFollowing">
                <ProfilePicture
                  userImage={
                    friend?.profilePicture
                      ? friend.profilePicture
                      : "person/noAvatar.png"
                  }
                  classname="rightbarFollowingImg"
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
