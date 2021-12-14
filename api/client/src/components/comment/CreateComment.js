import './createComment.css';

import { useState } from 'react';

import ProfilePicture from '../profilePicture/ProfilePicture';

const CreateComment = ({ user, handleSubmit }) => {
  const [currentValue, setCurrentValue] = useState('');

  return (
    <>
      <form
        className="CommentForm"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(currentValue);
          setCurrentValue('');
        }}
      >
        <ProfilePicture
          userImage={user?.profilePicture}
          classname="postProfileImg"
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
