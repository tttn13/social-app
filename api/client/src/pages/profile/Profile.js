import { useContext } from "react";
import "./profile.css";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { useFetchUser } from "../../components/customHooks/useFetchUser";
import { isEmpty } from "../../utils/utils";
import ProfilePicture from "../../components/profilePicture/ProfilePicture";

const Profile = () => {
  const currentUser = useContext(AuthContext).user.user;
  const usernameFromParams = useParams().username;
  const { user: selectedUser } = useFetchUser({ username: usernameFromParams });
  
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        {!isEmpty(selectedUser) && (
          <div className="profileRight">
            <div className="profileRightTop">
              <div className="profileCover">
                <ProfilePicture
                  coverImage={selectedUser?.coverPicture}
                  classname="profileCoverImg"
                />
                <ProfilePicture
                  userImage={selectedUser?.profilePicture}
                  classname="profileUserImg"
                />
              </div>

              <div className="profileInfo">
                <h4 className="profileInfoName">{selectedUser.username}</h4>
                <span className="profileInfoDesc">{selectedUser.desc}</span>
              </div>
            </div>

            <div className="profileRightBottom">
              <Feed currentUser={currentUser}/> 
              <Rightbar currentUser={currentUser} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
