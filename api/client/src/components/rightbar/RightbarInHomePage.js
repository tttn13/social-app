import Loading from '../../pages/Loading';
import { useGetFriends } from '../customHooks/useGetFriends';
import OnlineFriends from '../online/OnlineFriends';
import IconImage from '../profilePicture/IconImage';

const RightbarInHomePage = ({ currentUser }) => {
  const { friends: currentUserFriends } = useGetFriends(currentUser);
  return (
    <>
      {currentUser && currentUserFriends ? (
        <>
          <div className="birthdayContainer">
            <IconImage imageSrc="gift.png" classname="birthdayImg" />
            <span className="birthdayText">
              <b>{currentUser.username} </b> and <b> 2 other friends </b> have a
              birthday today
            </span>
          </div>
          <div className="rightBarAdContainer">
            <h4 className="rightbarTitle">Other Content</h4>
            <IconImage
              imageSrc="otherContent.png"
              classname="rightbarContent"
            />
          </div>

          <OnlineFriends friends={currentUserFriends} />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default RightbarInHomePage;
