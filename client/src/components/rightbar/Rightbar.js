import "./rightbar.css";
import RightbarInProfilePage from "./RightbarInProfilePage";
import RightbarInHomePage from "./RightbarInHomePage";
import { useEffect, useState } from "react";
import { isEmpty } from "../../utils/utils";

const Rightbar = ({ selectedUser, currentUser, currentUserFriends }) => {
  
  const [isHomePage, setIsHomePage] = useState(true);

  useEffect(() => {
    !isEmpty(currentUser) && !selectedUser && setIsHomePage(true);
    !isEmpty(currentUser) && selectedUser && setIsHomePage(false);
  }, [selectedUser, currentUser, currentUserFriends]);

  return (
    <div className="rightbar">
      <div className="rightbarWrapper" id="rightbarWrapper">
        {isHomePage ? (
          <RightbarInHomePage
            currentUser={currentUser}
            currentUserFriends={currentUserFriends}
          />
        ) : (
          <RightbarInProfilePage
            selectedUser={selectedUser}
            currentUser={currentUser}
          />
        )}
      </div>
    </div>
  );
};

export default Rightbar;
