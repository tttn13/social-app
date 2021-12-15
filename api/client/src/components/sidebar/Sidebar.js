import "./sidebar.css";

import {
  Bookmark,
  Event,
  Group,
  HelpOutline,
  PlayCircleFilledOutlined,
  RssFeed,
  School,
  WorkOutline,
} from "@mui/icons-material";
import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";
import Loading from "../../pages/Loading";
import CloseFriend from "../closeFriend/CloseFriend";
import { useGetFriends } from "../customHooks/useGetFriends";

const Sidebar = () => {
  const { user } = useContext(AuthContext).user;
  const { friends: currentUserFriends } = useGetFriends(user)
  
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
          <button className="sidebarButton">Show More</button>
          <hr className="sidebarHr" />
          {currentUserFriends ? (
            <ul className="sidebarFriendList">
              {currentUserFriends.length > 0 &&
                currentUserFriends.map((friend) => (
                  <CloseFriend key={friend._id} user={friend} />
                ))}
            </ul>
          ) : <Loading />  }
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
