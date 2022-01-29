import './profile.css';

import { useContext } from 'react';
import { useParams } from 'react-router';

import { useFetchUser } from '../../components/customHooks/useFetchUser';
import Feed from '../../components/feed/Feed';
import ProfilePicture from '../../components/profilePicture/ProfilePicture';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import { AuthContext } from '../../context/AuthContext';
import { isEmpty } from '../../utils/utils';

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
                  coverImage={
                    selectedUser?.coverPicture.length > 0
                      ? selectedUser.coverPicture
                      : 'person/noCover.png'
                  }
                  classname="profileCoverImg"
                />
                <ProfilePicture
                  userImage={
                    selectedUser?.profilePicture.length > 0
                      ? selectedUser.profilePicture
                      : 'person/noAvatar.png'
                  }
                  classname="profileUserImg"
                />
              </div>

              <div className="profileInfo">
                <h4 className="profileInfoName">{selectedUser.username}</h4>
                <span className="profileInfoDesc">{selectedUser.desc}</span>
              </div>
            </div>

            <div className="profileRightBottom">
              <Feed currentUser={currentUser} />
              <Rightbar currentUser={currentUser} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
