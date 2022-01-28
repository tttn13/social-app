import env_config from '../../config/index';

const ProfilePicture = ({
  userImage,
  classname,
  coverImage,
  postImage,
  handleClickFn,
}) => {
  const { PF } = env_config;

  return (
    <>
      {userImage && (
        <img
          className={classname}
          alt=""
          src={`${PF}${userImage}`}
          onClick={handleClickFn && handleClickFn}
        />
      )}
      {coverImage && (
        <img className={classname} alt="" src={`${PF}${coverImage}`} />
      )}
      {postImage && (
        <img className={classname} alt="" src={`${PF}${postImage}`} />
      )}
    </>
  );
};

export default ProfilePicture;
