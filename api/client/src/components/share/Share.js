import './share.css';

import {
  Cancel,
  EmojiEmotions,
  Label,
  PermMedia,
  Room,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { lazy, Suspense, useContext, useState } from 'react';

import { AuthContext } from '../../context/AuthContext';
import Loading from '../../pages/Loading';
import { checkToken } from '../../services/auth.service';
import history from '../../utils/history';
import ProfilePicture from '../profilePicture/ProfilePicture';
import TaggedUsers from './TaggedUsers/TaggedUsers';

const Share = ({ user, addNewPost }) => {
  const [emojiModalActive, setEmojiModalActive] = useState(false);
  const [tagModalActive, setTagModalActive] = useState(false);
  const [locationModalActive, setLocationModalActive] = useState(false);
  const [checkInLocation, setCheckInLocation] = useState('');
  const [postDescValue, setPostDescValue] = useState('');
  const [file, setFile] = useState(null);
  const [taggedList, setTaggedList] = useState([]);
  const { dispatch } = useContext(AuthContext);
  const SearchLocationModal = lazy(() =>
    import('./OptionsModalBox/SearchLocationModal')
  );
  const TagModal = lazy(() => import('./OptionsModalBox/TagModal'));
  const EmojiModal = lazy(() => import('./OptionsModalBox/EmojiModal'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await checkToken({ dispatch, history });
    if (res === true) {
      const newPost = {
        userId: user._id,
        desc: postDescValue,
        taggedFriends: taggedList,
        postLocation: checkInLocation,
      };
      await submitPost(newPost);
    }
  };

  const submitPost = async (newPost) => {
    if (postDescValue.length === 0) {
      return alert("Can't share empty post");
    }
    if (postDescValue.length > 0) {
      try {
        await addNewPost(newPost, file);
      } catch (error) {
        console.error({ err: error, msg: "Can't create post" });
      }
      resetForm();
    }
  };

  const resetForm = () => {
    setCheckInLocation('');
    setPostDescValue('');
    setFile(null);
    setTaggedList([]);
  };

  const removeTaggedUsers = () => {
    setTaggedList([]);
  };

  const addEmojiToPost = (value) => {
    setPostDescValue(postDescValue + value);
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <ProfilePicture
            userImage={
              user?.profilePicture.length > 0
                ? user.profilePicture
                : 'person/noAvatar.png'
            }
            classname="shareProfileImg"
          />

          <div className="shareTextContainer">
            <TaggedUsers
              classname="ShareTaggedFriends"
              currentUser={user}
              taggedList={taggedList}
              removeUsersFn={removeTaggedUsers}
            />

            <textarea
              placeholder={`What's on your mind, ${user.username} ?`}
              className="shareInput"
              name="postDesc"
              value={postDescValue}
              onChange={(e) => setPostDescValue(e.target.value)}
            />
          </div>
        </div>
        <hr className="shareHr" />

        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={handleSubmit}>
          <div className="shareOptions">
            <Suspense fallback={<Loading />}>
              <label htmlFor="file" className="shareOption">
                <PermMedia htmlColor="tomato" className="shareIcon" />
                <span className="shareOptionText">Photo or Video</span>
                <input
                  style={{ display: 'none' }}
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>

              <div className="shareOption">
                <Label htmlColor="tomato" className="shareIcon" />
                <span
                  className="shareOptionText TagIcon"
                  onClick={() => setTagModalActive(!tagModalActive)}
                >
                  Tag
                </span>

                <TagModal
                  addTaggedList={setTaggedList}
                  setTagModalActive={setTagModalActive}
                  tagModalActive={tagModalActive}
                />
              </div>

              <div
                className="shareOption locationOption "
                style={{
                  alignItems: `${
                    checkInLocation.length > 0 ? 'start' : 'center'
                  }`,
                }}
              >
                <Room htmlColor="tomato" className="shareIcon LocationIcon" />
                <span
                  className="shareOptionText LocationIcon"
                  onClick={() => setLocationModalActive(!locationModalActive)}
                >
                  {checkInLocation.length > 0 ? checkInLocation : 'Location'}
                </span>
                {checkInLocation.length > 0 && (
                  <IconButton
                    size="xsmall"
                    className="deleteLocation"
                    aria-label="Delete"
                    onClick={() => setCheckInLocation('')}
                  >
                    &times;
                  </IconButton>
                )}
                <SearchLocationModal
                  setLocationModalActive={setLocationModalActive}
                  updateLocation={setCheckInLocation}
                  locationModalActive={locationModalActive}
                />
              </div>

              <div className="shareOption">
                <EmojiEmotions htmlColor="tomato" className="shareIcon" />
                <span
                  className="shareOptionText emojiModalBtn"
                  onClick={() => setEmojiModalActive(!emojiModalActive)}
                >
                  Feelings
                </span>
                {emojiModalActive && (
                  <EmojiModal
                    emojiModalActive={emojiModalActive}
                    setEmojiModalActive={setEmojiModalActive}
                    addEmojiToPost={addEmojiToPost}
                  />
                )}
              </div>
            </Suspense>
          </div>

          <button className="shareButton" type="submit" value="Submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
