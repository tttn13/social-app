import "./topbar.css";
import { Person, Chat, Notifications, Logout } from "@mui/icons-material";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import SearchBarDropdown from "./SearchBarDropdown";
import { useFetchSearchResults } from "../customHooks/useFetchSearchResults";
import { logoutUser } from "../../context/AsyncActions";
import { pause } from "../../utils/utils";
import ProfilePicture from "../profilePicture/ProfilePicture";
import SearchForm from "./SearchForm";

const Topbar = () => {
  const user = useContext(AuthContext).user.user;
  const { dispatch } = useContext(AuthContext);
  const [resultsModalActive, setResultsModalActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownActive, setDropdownActive] = useState(false);
  const history = useHistory();
  const { results: searchResults } = useFetchSearchResults({
    user: user,
    searchQuery: searchTerm,
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (user && searchTerm.length > 0) {
        setResultsModalActive(true);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [user, history.location.pathname, searchTerm]);

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
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
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
                userImage={user?.profilePicture}
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
