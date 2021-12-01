import { useState, useContext, useRef } from "react";
import "./post.css";
import { MoreHoriz, Edit, Delete, CancelPresentation } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useFetchUser } from "../customHooks/useFetchUser";
import PostFooter from "./PostFooter/PostFooter";
import ReactTimeAgo from "react-time-ago";
import { Public } from "@mui/icons-material";
import ModalBoxContainer from "./EditPostModalBox/ModalBoxContainer";
import TaggedUsers from "../share/TaggedUsers/TaggedUsers";
import { isEmpty } from "../../utils/utils";
import { useOutsideAlerter } from "../customHooks/useOutsideAlerter";

const Post = ({ post, handleDeletePost }) => {
  const {
    _id: postId,
    userId,
    desc,
    img,
    createdAt,
    taggedFriends,
    postLocation,
  } = post;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const currentUser = useContext(AuthContext).user.user;
  const { user } = useFetchUser({ userId: userId });
  const postSettingsMenu = useRef();

  const [postSettingsActive, setPostSettingsActive] = useState(false);
  const [postIsBeingEdited, setPostIsBeingEdited] = useState(null);
  const [postDisplayed, setPostDisplayed] = useState(true);
  
  const PostSettings = () => {
    return (
      <ul
        ref={postSettingsMenu}
        className="PostSettings"
        style={{
          display: `${postSettingsActive ? "flex" : "none"}`,
        }}
      >
        {String(currentUser._id) !== String(userId) ?  
          <li
            className="settingItem"
            onClick={() => {
              setPostDisplayed(false)
            }}
          >
            <CancelPresentation />
            Hide post
          </li>
        :
        <>
        <li className="settingItem" onClick={() => setPostIsBeingEdited(true)}>
          <Edit />
          Edit post
        </li>
       
        <ModalBoxContainer
          currentPost={post}
          user={currentUser}
          setModalActive={setPostSettingsActive}
          setPostIsBeingEdited={setPostIsBeingEdited}
          postIsBeingEdited={postIsBeingEdited}
        />
        <li
          className="settingItem"
          onClick={() => {
            handleDeletePost(postId, currentUser._id);
            setPostSettingsActive(false);
          }}
        >
          <Delete />
          Move to trash
        </li>
        </>
        }
      </ul>
    );
  };

  useOutsideAlerter({
    ref: postSettingsMenu,
    setModalActive: setPostSettingsActive,
  });

  return (
    <div className="post" id={`post-${postId}`} 
    style={{
      display: `${postDisplayed ? "block" : "none"}`,
    }}>
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <div className="postHeader">
              <Link to={`profile/${user.username}`}>
                <img
                  src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="postProfileImg"
                />
              </Link>
              {!isEmpty(user) && (
                <>
                  <span className="postUsername">{user.username}</span>
                  <TaggedUsers
                    classname="taggedFriends"
                    taggedList={taggedFriends}
                    taggedUsersForPost="onlyTaggedUsers"
                  />
                </>
              )}
            </div>
            <div className="postDateAndLocation">
              <ReactTimeAgo
                className="postDate"
                date={new Date(createdAt)}
                locale="en-US"
                timeStyle="twitter"
              />
              {postLocation.length > 0 && (
                <span className="postLocation">
                  <Public fontSize="small" />
                  <span className="location">
                    {postLocation.split(",")[0]}{" "}
                  </span>
                </span>
              )}
            </div>
          </div>

          <div className="postTopRight">
            <MoreHoriz
              className="postSettingsIcon"
              color="action"
              onClick={() => setPostSettingsActive(!postSettingsActive)}
            />
            <PostSettings />
          </div>
        </div>

        <div className="postCenter">
          <span className="postText">{desc ? desc : null}</span>
          <img src={img ? PF + img : ""} alt="" className="postImg" />
        </div>

        {post && <PostFooter post={post} currentUser={currentUser} />}
      </div>
    </div>
  );
};

export default Post;
