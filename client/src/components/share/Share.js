import "./share.css";
import { useState } from "react";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@mui/icons-material";
import SearchLocationModal from "./OptionsModalBox/SearchLocationModal";
import TagModal from "./OptionsModalBox/TagModal";
import EmojiModal from "./OptionsModalBox/EmojiModal";
import TaggedUsers from "./TaggedUsers/TaggedUsers";

const Share = ({ user, addNewPost }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [emojiModalActive, setEmojiModalActive] = useState(false);
  const [tagModalActive, setTagModalActive] = useState(false);
  const [locationModalActive, setLocationModalActive] = useState(false);
  const [checkInLocation, setCheckInLocation] = useState("");
  const [postDescValue, setPostDescValue] = useState("");
  const [file, setFile] = useState(null);
  const [taggedList, setTaggedList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (postDescValue.length === 0) alert("Can't share empty post");
    if (postDescValue.length > 0) {
      const newPost = {
        userId: user._id,
        desc: postDescValue,
        taggedFriends: taggedList,
        postLocation: checkInLocation,
      };
      await addNewPost(newPost, file)
      setPostDescValue("")
    }
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
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
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
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
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
                  checkInLocation.length > 0 ? "start" : "center"
                }`,
              }}
            >
              <Room htmlColor="tomato" className="shareIcon LocationIcon" />
              <span
                className="shareOptionText LocationIcon"
                onClick={() => setLocationModalActive(!locationModalActive)}
              >
                {checkInLocation.length > 0 ? checkInLocation : "Location"}
              </span>

              <SearchLocationModal
                setLocationModalActive={setLocationModalActive}
                setCheckInLocation={setCheckInLocation}
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
              <EmojiModal
                emojiModalActive={emojiModalActive}
                setEmojiModalActive={setEmojiModalActive}
                addEmojiToPost={addEmojiToPost}
              />
            </div>
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
