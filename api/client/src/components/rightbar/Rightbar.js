import "./rightbar.css";
import RightbarInProfilePage from "./RightbarInProfilePage";
import RightbarInHomePage from "./RightbarInHomePage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Rightbar = ({ currentUser }) => {
  const selectedUsername = useParams().username;
  const [isHomePage, setIsHomePage] = useState(true);

  useEffect(() => {
    !selectedUsername 
      ? setIsHomePage(true)
      : setIsHomePage(false) 
  }, [selectedUsername, currentUser.username]);

  return (
    <div className="rightbar">
      <div className="rightbarWrapper" id="rightbarWrapper">
        {isHomePage && currentUser ? (
          <RightbarInHomePage currentUser={currentUser} />
        ) : (
          <RightbarInProfilePage
            selectedUsername={selectedUsername}
            currentUser={currentUser}
          />
        )}
      </div>
    </div>
  );
};

export default Rightbar;
