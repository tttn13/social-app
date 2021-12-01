import "./createComment.css";
import { useState } from "react";

const CreateComment = ({ user, handleSubmit }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [currentValue, setCurrentValue] = useState("");

  return (
    <>
      <form className="CommentForm" 
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(currentValue)
        setCurrentValue("")
      }}>
        <img
          src={
            user.profilePicture
              ? PF + user.profilePicture
              : PF + "person/noAvatar.png"
          }
          alt=""
          className="postProfileImg"
        />
        <input
          className="CommentInput"
          placeholder="Write a comment.."
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
        />
      </form>
    </>
  );
};

export default CreateComment;
