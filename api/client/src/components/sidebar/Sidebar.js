import "./sidebar.css";

import {
  Bookmark,
  Event,
  People,
  PlayCircleFilledOutlined,
  RssFeed,
  NewspaperOutlined
} from "@mui/icons-material";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import Loading from "../../pages/Loading";
import CloseFriend from "../closeFriend/CloseFriend";
import { useGetFriends } from "../customHooks/useGetFriends";

const Sidebar = () => {
  const { user } = useContext(AuthContext).user;
  const { friends: currentUserFriends } = useGetFriends(user);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <Link to={`/`} style={{ textDecoration: "none", color: "black" }}>
            <li className="sidebarListItem">
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">Feed</span>
            </li>
          </Link>

          <Link
            to={`/videos`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <li className="sidebarListItem">
              <PlayCircleFilledOutlined className="sidebarIcon" />
              <span className="sidebarListItemText">Videos</span>
            </li>
          </Link>

          <Link to={`/news`} style={{ textDecoration: "none", color: "black" }}>
            <li className="sidebarListItem">
              <NewspaperOutlined className="sidebarIcon" />
              <span className="sidebarListItemText">News</span>
            </li>
          </Link>

          <Link
            to={`/saved`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <li className="sidebarListItem">
              <Bookmark className="sidebarIcon" />
              <span className="sidebarListItemText">Bookmarks</span>
            </li>
          </Link>
          <Link
            to={`/events`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <li className="sidebarListItem">
              <Event className="sidebarIcon" />
              <span className="sidebarListItemText">Events</span>
            </li>
          </Link>
          <Link
            to={`/findfriends`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <li className="sidebarListItem">
              <People className="sidebarIcon" />
              <span className="sidebarListItemText">Find friends</span>
            </li>
          </Link>
          <hr className="sidebarHr" />
          {currentUserFriends ? (
            <ul className="sidebarFriendList">
              {currentUserFriends.length > 0 &&
                currentUserFriends.map((friend) => (
                  <CloseFriend key={friend._id} user={friend} />
                ))}
            </ul>
          ) : (
            <Loading />
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
