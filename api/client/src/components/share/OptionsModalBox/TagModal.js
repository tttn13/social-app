import './tagModal.css';

import { Cancel, Close, Search } from '@mui/icons-material';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../../context/AuthContext';
import {
  containsObject,
  getMatches,
  removeOverlappedUsers,
  removeUserFromList,
} from '../../../utils/utils';
import { useDetectInputChange } from '../../customHooks/useDetectInputChange';
import { useGetFriends } from '../../customHooks/useGetFriends';
import { useOutsideAlerter } from '../../customHooks/useOutsideAlerter';
import ProfilePicture from '../../profilePicture/ProfilePicture';

const TagModal = ({
  addTaggedList,
  setTagModalActive,
  tagModalActive,
  storedList,
}) => {
  const { user } = useContext(AuthContext).user;
  const tagModalContent = useRef();
  const searchInput = useRef();
  const [suggestionsList, setSuggestionsList] = useState([]);
  const [value, setValue] = useState('');
  const [taggedList, setTaggedList] = useState([]);
  const { friends: frs } = useGetFriends(user);
  const [friends, setFriends] = useState([]);

  const selectFriend = (taggedUser) => {
    if (!containsObject(taggedUser, taggedList)) {
      setValue('');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    addTaggedList(taggedList);
    setTagModalActive(false);
  };

  const getAllMatches = (value, suggestionsList) => {
    const friendSearches = getMatches(value, suggestionsList);
    setSuggestionsList(friendSearches);
  };
  const stopSearching = () => {
    getAllMatches(value, suggestionsList);
  };
  useEffect(() => {
    frs && setFriends(frs);
  }, [frs]);

  useEffect(() => {
    storedList && setTaggedList(storedList);
  }, [storedList]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (value.length > 0) {
        getAllMatches(value, suggestionsList);
      }
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [suggestionsList, value]);

  useEffect(() => {
    if (value.length === 0 && friends) {
      const newList = removeOverlappedUsers(friends, taggedList);
      setSuggestionsList(newList);
    }
  }, [friends, taggedList, value.length]);

  useOutsideAlerter({
    ref: tagModalContent,
    setModalActive: setTagModalActive,
  });

  useDetectInputChange({
    ref: searchInput,
    execFn: stopSearching,
    parentRef: tagModalContent,
  });

  return (
    <div
      className="tagModal"
      style={{ display: `${tagModalActive ? 'flex' : 'none'}` }}
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
              ref={searchInput}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <button className="doneButton" onClick={(e) => handleSubmit(e)}>
            Done
          </button>
        </div>

        <div
          className="taggedBox"
          style={{ display: `${taggedList.length > 0 ? 'flex' : 'none'}` }}
        >
          <h5 className="friendListHeader">TAGGED</h5>
          <ul className="taggedUsersList">
            {taggedList &&
              taggedList.length > 0 &&
              taggedList.map((u, idx) => (
                <li className="taggedListItem" key={idx} user={u}>
                  <Link
                    to={`/profile/${u.username}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <span
                      className="taggedProfile"
                      style={{ fontSize: '16px' }}
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
            {suggestionsList && suggestionsList.length > 0
              ? suggestionsList.map((u) => (
                  <li key={u._id} user={u} onClick={(e) => selectFriend(u)}>
                    <ProfilePicture
                      userImage={u?.profilePicture}
                      classname="sidebarFriendImg"
                    />
                    <span className="sidebarFriendName">{u.username}</span>
                  </li>
                ))
              : 'No searches found'}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TagModal;
