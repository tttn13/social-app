import Loading from "../Loading";
import OnlineFriends from "../online/OnlineFriends";

const RightbarInHomePage = ({ currentUser, currentUserFriends }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
      <>
        <div className="birthdayContainer">
          <img src={`${PF}gift.png`} className="birthdayImg" alt="" />
          <span className="birthdayText">
            <b>{currentUser.username} </b> and <b> 2 other friends </b> have a birthday
            today
          </span>
        </div>
        <div className="rightBarAdContainer">
          <h4 className="rightbarTitle">Sponsored</h4> 
          <img src={`${PF}adContent.png`} className="rightbarAd" alt="" />
        </div>
        {currentUserFriends 
        ? <OnlineFriends friends={currentUserFriends}/> 
        : <Loading />
      }
      </>
    );
  };

  export default RightbarInHomePage;

