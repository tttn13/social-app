import "./topbar.css";
import { Search, Person, Chat, Notifications, Logout } from "@mui/icons-material";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useCallback, useContext, useEffect, useState } from "react";
import SearchBarDropdown from "./SearchBarDropdown";
import { useFetchSearchResults } from "../customHooks/useFetchSearchResults";
import { logoutUser } from "../../context/AsyncActions";
import { pause, hasWhiteSpace } from "../../utils/utils";

const Topbar = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const user = useContext(AuthContext).user.user;
  const { dispatch } = useContext(AuthContext);
  const [resultsModalActive, setResultsModalActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownActive, setDropdownActive] = useState(false)
  const history = useHistory();
  const [searchResults, setSearchResults] = useState([])
  const { fetchRes } = useFetchSearchResults({ 
    searchQuery: searchTerm  
  });
  
  // const fetchData = async () => {
  //   const res = await fetchRes(searchTerm)
  //   setSearchResults(res)
  // }
  
  const fetchData = useCallback(
    async () => {
      const res = await fetchRes(searchTerm)
      setSearchResults(res)
    },
    [searchTerm, fetchRes],
  )
  
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length > 0 && history.location.pathname !== "/searchresults"
      ) {
        fetchData()
        setResultsModalActive(true)
      }
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm.length, history.location.pathname]);

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

  const handleCloseBtn = (e) => {
    setResultsModalActive(false);
  };

  const handleLogOut = async () => {
    await pause(1000)
    await logoutUser(dispatch);
  };

  // Close the dropdown if the user clicks outside of it
  // window.onclick = function (e) {
  //   if (!e.target.matches(".dropbtn") && dropdownActive) {
  //     setDropdownActive(false)
  //   }
  //   if (!e.target.matches(".searchbar-dropdown-content") && resultsModalActive) {
  //     setResultsModalActive(false)
  //   }
  // };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">MySocial</span>{" "}
        </Link>
      </div>

      <div className="topbarCenter">
        <form
          className="searchbar"
          id="searchbar"
          onSubmit={(e) => handleSubmit(e)}
          style={{ borderRadius: `${resultsModalActive ? "15px 15px 0px 0px" : "20px" }` }}
        >
          <Search className="searchIcon" type="submit" />

          <input
            type="text"
            autoComplete="off"
            className="searchInput"
            placeholder="Search for a friend or post "
            onChange={(e) => {
                if (!hasWhiteSpace(e.target.value)) {
                  setSearchTerm(e.target.value)
                } else {
                  setSearchTerm(e.target.value.trim())
                }
            }}
          />
        </form> 

        {resultsModalActive && 
          <SearchBarDropdown searchResults={searchResults} handleCloseBtn={handleCloseBtn} /> }

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
              <img
                src={
                  user?.profilePicture
                    ? PF + user?.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt="topbarImg"
                className="topbarImg dropbtn"
                onClick={()=>setDropdownActive(!dropdownActive)}
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
