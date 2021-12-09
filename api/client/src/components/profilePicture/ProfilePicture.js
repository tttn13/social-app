import React from "react";
import config from "../../config";

const ProfilePicture = ({
  userImage,
  classname,
  coverImage,
  postImage,
  handleClickFn,
}) => {
  const { PF } = config;

  const userImageSrc = (source) => {
    return source ? PF + source : PF + "person/noAvatar.png";
  };
  const coverImgSrc = (source) => {
    return source ? PF + source : PF + "person/noCover.png";
  };

  const postImgSrc = (source) => {
    return source ? PF + source : "";
  };

  return (
    <>
      {userImage && (
        <img
          className={classname}
          alt=""
          src={userImageSrc(userImage)}
          onClick={handleClickFn && handleClickFn}
        />
      )}

      {coverImage && (
        <img className={classname} alt="" src={coverImgSrc(coverImage)} />
      )}
      {postImage && (
        <img className={classname} alt="" src={postImgSrc(postImage)} />
      )}
    </>
  );
};

export default ProfilePicture;
