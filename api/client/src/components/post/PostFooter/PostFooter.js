import "./postFooter.css";

import { ChatBubbleOutline, ThumbUp } from "@mui/icons-material";
import { useEffect,useState } from "react";

import {
  createComment,
  deleteComment,
  getComment,
  likePost,
  updateComment,
} from "../../../services/user.service";
import Comment from "../../comment/Comment";
import CreateComment from "../../comment/CreateComment";
import IconImage from "../../profilePicture/IconImage";

const PostFooter = ({ post, currentUser }) => {
  const { _id: postId, likes, comments: commentsIds } = post;
  const [likeCount, setLikeCount] = useState(likes?.length);
  const [isLiked, setIsLiked] = useState(likes?.includes(currentUser?._id));
  const [commentsList, setCommentsList] = useState([]);
  const [commentModalActive, setCommentModalActive] = useState(false);

  const fetchComments = (idsList) => {
    let newList = [];
    idsList.map(async (id) => {
      const res = await getComment(id);
      newList.push(res.data);
    });
    return newList;
  };

  const likeHandler = async () => {
    await likePost(postId, currentUser._id);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    setIsLiked(!isLiked);
  };

  const handleSubmit = async (cmtText) => {
    try {
      const res = await createComment(postId, {
        body: cmtText,
        userId: currentUser._id,
      });
      console.log("res.data", res.data)
      setCommentsList([...commentsList, res.data]);
    } catch (error) {
      console.error({ error: error, msg: "Can't creating comment" });
    }
  };

  const deleteCommentFn = async (commentId) => {
    const filteredComments = commentsList.filter(
      (cmt) => cmt._id !== commentId
    );
    setCommentsList(filteredComments);
    await deleteComment(commentId, currentUser._id);
  };

  const editCommentFn = async (cmtId, cmtBody) => {
    const res = await updateComment(String(cmtId), currentUser._id, cmtBody);

    const newList = commentsList.map((cmt) =>
      String(cmt._id) === String(cmtId)
        ? {
            ...cmt,
            body: res.data.body,
          }
        : cmt
    );

    setCommentsList(newList);
  };

  useEffect(() => {
    const fetchData = async () => {
      const cmts = await fetchComments(commentsIds);
      setCommentsList(cmts);
    };
    commentsIds.length > 0 && commentsIds !== "undefined" && fetchData();
  }, [commentsIds]);

  return (
    <>
      <div className="postBottomStats">
        <div
          className="postBottomStatsLeft"
          style={likeCount > 0 ? { display: "flex" } : { visibility: "hidden" }}
        >
          <IconImage
            imageSrc="like.png"
            classname="likeIcon"
            handleClick={likeHandler}
          />
          <IconImage
            imageSrc="heart.png"
            classname="likeIcon"
            handleClick={likeHandler}
          />

          <span className="postLikeCounter">{likeCount} people liked it</span>
        </div>

        <div className="postBottomStatsRight">
          <span
            className="commentsModalShow"
            onClick={() => setCommentModalActive(!commentModalActive)}
          >
            {commentsIds.length} comments
          </span>
        </div>
      </div>
      <hr className="postHr" />

      <div className="postBottomActions">
        <button className="likeButton" onClick={likeHandler}>
          <ThumbUp className={`thumbIcon ${isLiked && "liked"} `} />
          {isLiked ? "Liked" : "Like"}
        </button>
        <button
          className="commentsButton"
          onClick={() => setCommentModalActive(!commentModalActive)}
        >
          <ChatBubbleOutline className="commentIcon" />
          Comment
        </button>
      </div>

      <div
        className="commentsModal"
        style={{ display: `${commentModalActive ? "block" : "none"}` }}
      >
        {commentsList &&
          commentsList.length > 0 &&
          commentsList.map((cmt, idx) => (
            <Comment
              key={idx}
              comment={cmt}
              post={post}
              currentUser={currentUser}
              handleDeleteUI={deleteCommentFn}
              editComment={editCommentFn}
            />
          ))}
        <CreateComment
          user={currentUser}
          postId={postId}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default PostFooter;
