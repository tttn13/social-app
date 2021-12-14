import './comment.css';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';

import { useFetchUser } from '../customHooks/useFetchUser';
import { useOutsideAlerter } from '../customHooks/useOutsideAlerter';
import ProfilePicture from '../profilePicture/ProfilePicture';

const Comment = ({ comment, currentUser, handleDeleteUI, editComment }) => {
  const [settingsActive, setSettingsActive] = useState(false);
  const [commentBody, setCommentBody] = useState(comment?.body);
  const [commentIsBeingEdited, setCommentIsBeingEdited] = useState(null);
  const commentActionsMenu = useRef();
  const commentBodyRef = useRef();
  const { user } = useFetchUser({ userId: comment?.userId });

  const submitChanges = (e) => {
    editComment(comment._id, commentBody);
    setCommentIsBeingEdited(false);
  };

  const SettingsPopup = () => {
    return (
      <ul
        ref={commentActionsMenu}
        className="commentActionsList"
        style={{
          display: `${settingsActive ? 'flex' : 'none'}`,
        }}
      >
        <li
          className="commentActionsListItem"
          onClick={() => setCommentIsBeingEdited(true)}
        >
          Edit comment
        </li>
        <li
          className="commentActionsListItem"
          onClick={() => {
            handleDeleteUI(comment._id);
            setSettingsActive(false);
          }}
        >
          Delete comment
        </li>
      </ul>
    );
  };

  useOutsideAlerter({
    ref: commentActionsMenu,
    setModalActive: setSettingsActive,
  });

  useEffect(() => {
    let commentBody = commentBodyRef.current;
    if (commentIsBeingEdited) {
      commentBody.focus();
      commentBody.readOnly = false;
    }
    return () => {
      commentBody.blur();
      commentBody.readOnly = true;
      setSettingsActive(false);
    };
  }, [commentIsBeingEdited]);

  return (
    <div className="CommentContainer">
      <ProfilePicture
        userImage={user?.profilePicture}
        classname="CommentAvatar"
      />
      <div className="BodyContainer">
        <div className="BodyContainerWrapper">
          <Link
            to={`profile/${user.username}`}
            style={{
              color: 'black',
              textDecoration: 'none',
            }}
          >
            <span className="Username">{user.username}</span>
          </Link>

          {comment && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitChanges();
              }}
              className="Comment-Form"
            >
              <input
                type="text"
                ref={commentBodyRef}
                className="Comment-Body"
                readOnly={true}
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
              />
            </form>
          )}
        </div>
        <span className="editedStatus">
          {comment?.createdAt && (
            <ReactTimeAgo
              date={new Date(comment.createdAt)}
              timeStyle="twitter"
              locale="en-US"
            />
          )}
        </span>
        <span className="editedStatus">
          {comment?.isEdited || commentIsBeingEdited === false ? 'Edited' : ''}
        </span>
      </div>
      {currentUser._id === user._id && (
        <div className="commentSettings">
          <MoreHorizIcon
            className="PopButton"
            color="action"
            onClick={() => setSettingsActive(!settingsActive)}
          />
          <SettingsPopup />
        </div>
      )}
    </div>
  );
};

export default Comment;
