import { useState, useEffect, useContext } from "react";
import "./profile.css";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { useFetchPosts } from "../../components/customHooks/useFetchPosts";
import { useFetchUser } from "../../components/customHooks/useFetchUser";
import { isEmpty } from "../../utils/utils";
import { useCallback } from "react";

const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const currentUser = useContext(AuthContext).user.user;
  const usernameFromParams = useParams().username;
  const { user: selectedUser } = useFetchUser({ username: usernameFromParams });
  const { fetchSelectedUserPosts: getUserPosts } =
    useFetchPosts(usernameFromParams);
  const [selectedUserPosts, setSelectedUserPosts] = useState([]);
  // const fetchData = async () => {
  //   const posts = await getUserPosts(usernameFromParams);
  //   setSelectedUserPosts(posts)
  // }
  const fetchData = useCallback(async () => {
    const posts = await getUserPosts(usernameFromParams);
    setSelectedUserPosts(posts);
  }, [usernameFromParams, getUserPosts]);

  useEffect(() => {
    if (usernameFromParams) {
      fetchData();
    }
    return () => {
      setSelectedUserPosts([]);
    };
  }, [usernameFromParams, fetchData]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar user={currentUser} />
        {!isEmpty(selectedUser) && (
          <div className="profileRight">
            <div className="profileRightTop">
              <div className="profileCover">
                <img
                  className="profileCoverImg"
                  alt=""
                  src={
                    selectedUser.coverPicture
                      ? PF + selectedUser.coverPicture
                      : PF + "person/noCover.png"
                  }
                />
                <img
                  className="profileUserImg"
                  alt=""
                  src={
                    selectedUser.profilePicture
                      ? PF + selectedUser.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                />
              </div>

              <div className="profileInfo">
                <h4 className="profileInfoName">{selectedUser.username}</h4>
                <span className="profileInfoDesc">{selectedUser.desc}</span>
              </div>
            </div>

            <div className="profileRightBottom">
              {selectedUserPosts && (
                <Feed
                  usernameFromParams={usernameFromParams}
                  posts={selectedUserPosts}
                />
              )}
              <Rightbar selectedUser={selectedUser} currentUser={currentUser} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
