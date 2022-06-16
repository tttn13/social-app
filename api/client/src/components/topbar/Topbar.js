import "./topbar.css";

import { Chat, Logout, Notifications, Person } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { logoutUser } from "../../context/AsyncActions";
import { AuthContext } from "../../context/AuthContext";
import { pause } from "../../utils/utils";
import { useCountFriendRequest } from "../customHooks/useCountFriendRequest";
import { useFetchSearchResults } from "../customHooks/useFetchSearchResults";
import ProfilePicture from "../profilePicture/ProfilePicture";
import SearchBarDropdown from "./SearchBarDropdown";
import SearchForm from "./SearchForm";

const Topbar = () => {
  const user = useContext(AuthContext).user.user;
  const { dispatch } = useContext(AuthContext);
  const [resultsModalActive, setResultsModalActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownActive, setDropdownActive] = useState(false);
  const { friendReqs } = useCountFriendRequest({ currUser: user });
  const [notiCount, setNotiCount] = useState([])
  const history = useHistory();
  const { results: searchResults } = useFetchSearchResults({
    user: user,
    searchQuery: searchTerm,
  });
  
  const handleSubmit = (e) => {
    e.preventDefault(e);
    setResultsModalActive(false);
    history.push({
      pathname: "/searchresults",
      search: `?query=${searchTerm}`,
      state: {
        params: searchTerm,
      },
    });
  };

  const handleLogOut = async () => {
    await pause(1000);
    await logoutUser(dispatch);
  };
  
  useEffect(() => {
    setNotiCount(friendReqs?.length)
  }, [friendReqs, user])

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (user && searchTerm.length > 0) {
        setResultsModalActive(true);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [user, history.location.pathname, searchTerm]);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">MySocial</span>{" "}
        </Link>
      </div>

      <div className="topbarCenter">
        <SearchForm
          resultsModalActive={resultsModalActive}
          handleSubmit={handleSubmit}
          setSearchTerm={setSearchTerm}
        />

        {resultsModalActive && (
          <SearchBarDropdown
            searchResults={searchResults}
            setResultsModalActive={setResultsModalActive}
          />
        )}
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <Link
            to={`/findfriends`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <div className="topbarIconItem">
              <Person />
              <span className="topbarIconBadge notification">
                {notiCount}
              </span>
            </div>
          </Link>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">4</span>
          </div>
          <div className="topbarIconItem ">
            <button className="topbarImgBtn">
              <ProfilePicture
                userImage={
                  user?.profilePicture.length > 0
                    ? user.profilePicture
                    : "person/noAvatar.png"
                }
                classname="topbarImg dropbtn"
                handleClickFn={() => setDropdownActive(!dropdownActive)}
              />
            </button>
            <div
              className="ProfileDropdown-Content"
              id="ProfileDropdown"
              style={{ display: `${dropdownActive ? "flex" : "none"}` }}
            >
              <Link
                to={`/profile/${user?.username}`}
                style={{ textDecoration: "none" }}
              >
                <button>
                  <Person /> Show profile
                </button>
              </Link>
              <hr></hr>
              <button onClick={() => handleLogOut()}>
                <Logout /> Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
