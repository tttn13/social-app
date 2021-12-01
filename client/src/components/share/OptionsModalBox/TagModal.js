import { useState, useEffect, useRef, useContext, useCallback } from "react";
import "./tagModal.css";
import { Link } from "react-router-dom";
import { Search, Cancel, Close } from "@mui/icons-material";
import {
  containsObject,
  removeOverlappedUsers,
  removeUserFromList,
} from "../../../utils/utils";
import { useGetFriends } from "../../customHooks/useGetFriends";
import { useFetchSearchResults } from "../../customHooks/useFetchSearchResults";
import { useOutsideAlerter } from "../../customHooks/useOutsideAlerter";
import { AuthContext } from "../../../context/AuthContext";

const TagModal = ({
  addTaggedList,
  setTagModalActive,
  tagModalActive,
  storedList,
}) => {
  const tagModalContent = useRef()
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [suggestionsList, setSuggestionsList] = useState([]);
  const [value, setValue] = useState("");
  const [taggedList, setTaggedList] = useState([]);
  const [friends, setFriends] = useState([]);
  const user = useContext(AuthContext).user.user;
  const { getFriends } = useGetFriends(user);
  const { getFriendsSearchResults } = useFetchSearchResults({ searchQuery: value });

  const selectFriend = (taggedUser) => {
    if (!containsObject(taggedUser, taggedList)) {
      setTaggedList([...taggedList, taggedUser]);
      const removeFromSuggestions = removeUserFromList(
        suggestionsList,
        taggedUser
      );
      setSuggestionsList(removeFromSuggestions);
    }
  };

  const removeUser = (selectedUser) => {
    const removeFromTaggedList = removeUserFromList(taggedList, selectedUser);
    setTaggedList(removeFromTaggedList);
    //add to suggestions list
    setSuggestionsList([...suggestionsList, selectedUser]);
  };

  const handleInputChange = async (e) => {
    await setValue(e.target.value);
  };

  // useEffect(() => {
  //   if (storedList) setTaggedList(storedList);
  //   return () => {
  //     console.log("clean up tagged list")
  //     setTaggedList([])
  //   }
  // }, [storedList]);

  useEffect(() => {
    if (storedList) setTaggedList(storedList);
    return () => {
      console.log("clean up tagged list")
      setTaggedList([])
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (value.length > 0) {
        const friendSearches = await getFriendsSearchResults(
          value,
          suggestionsList
        );
        setSuggestionsList(friendSearches);
      }
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTaggedList(taggedList);
    setTagModalActive(false);
  }; 

  // const fetchAllFriends = useCallback(
  //   async () => {
  //     const frs = await getFriends(user);
  //     setFriends(frs);
  //   },
  //   [user, getFriends],
  // )

  useEffect(() => {
    const  fetchAllFriends = async () => {
      const frs = await getFriends(user);
      setFriends(frs);
    };
    fetchAllFriends();
    
  }, []);

  useEffect(() => {
    const fetchFriends = async () => {
      const newList = removeOverlappedUsers(friends, taggedList);
      setSuggestionsList(newList);
    };

    if (value.length === 0 && friends) {
      fetchFriends();
    }
  }, []);

  useOutsideAlerter({ ref: tagModalContent, setModalActive: setTagModalActive })

  return (
    <div
      className="tagModal"
      style={{ display: `${tagModalActive ? "flex" : "none"}` }}
    >
      <div ref={tagModalContent} className="tagModalContent">
        <div className="tagModalTop">
          <h3> Tag People</h3>
          <Cancel
            className="tagModalCloseBtn"
            fontSize="large"
            onClick={(e) => setTagModalActive(false)}
          />
        </div>
        <hr className="tagModalHr"></hr>

        <div className="tagModalCenter">
          <div className="tagModalSearch">
            <Search className="tagModalSearchIcon" type="submit" />
            <input
              type="text"
              className="tagModalSearchInput"
              placeholder="Search for a friend"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <button className="doneButton" onClick={(e) => handleSubmit(e)}>
            Done
          </button>
        </div>

        <div
          className="taggedBox"
          style={{ display: `${taggedList.length > 0 ? "flex" : "none"}` }}
        >
          <h5 className="friendListHeader">TAGGED</h5>
          <ul className="taggedUsersList">
            {taggedList.length > 0 &&
              taggedList.map((u, idx) => (
                <li className="taggedListItem" key={idx} user={u}>
                  <Link
                    to={`/profile/${u.username}`}
                    style={{ textDecoration: "none" }}
                  >
                    <span
                      className="taggedProfile"
                      style={{ fontSize: "16px" }}
                    >
                      {u.username}
                    </span>
                  </Link>
                  <Close
                    onClick={() => removeUser(u)}
                    style={{ fontSize: 15 }}
                  />
                </li>
              ))}
          </ul>
        </div>

        <div className="tagModalFooter">
          <h5 className="friendListHeader">SUGGESTIONS</h5>
          <ul className="friendList">
            {suggestionsList.length > 0 &&
              suggestionsList.map((u) => (
                <li key={u._id} user={u} onClick={(e) => selectFriend(u)}>
                  <img
                    src={
                      u.profilePicture
                        ? PF + u.profilePicture
                        : PF + "person/noAvatar.png"
                    }
                    alt=""
                    className="sidebarFriendImg"
                  />
                  <span className="sidebarFriendName">{u.username}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TagModal;
