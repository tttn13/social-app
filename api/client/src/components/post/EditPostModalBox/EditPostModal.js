import { useState, useRef, lazy, Suspense } from "react";
import "./editPostModal.css";
import {
  PermMedia,
  PersonAdd,
  LocationOn,
  Mood,
  Close,
  Public,
} from "@mui/icons-material";
import { updatePost, uploadFile } from "../../../services/user.service";
import ProfilePicture from "../../profilePicture/ProfilePicture";
import Loading from "../../../pages/Loading";
import TaggedUsers from "../../share/TaggedUsers/TaggedUsers";

const EditPostModal = ({
  currentPost,
  user,
  setModalActive,
  setPostIsBeingEdited,
}) => {
  const SearchLocationModal = lazy(() =>
    import("../../share/OptionsModalBox/SearchLocationModal")
  );
  const TagModal = lazy(() => import("../../share/OptionsModalBox/TagModal"));
  const EmojiModal = lazy(() =>
    import("../../share/OptionsModalBox/EmojiModal")
  );
  const postBodyRef = useRef();
  const [currentImage, setCurrentImage] = useState(currentPost?.img);
  const [imageFile, setImageFile] = useState(null);
  const [postBody, setPostBody] = useState(currentPost?.desc);
  const [taggedFriends, setTaggedFriends] = useState(
    currentPost?.taggedFriends
  );
  const [checkInLocation, setCheckInLocation] = useState(
    currentPost?.postLocation
  );
  const [tagModalActive, setTagModalActive] = useState(false);
  const [locationModalActive, setLocationModalActive] = useState(false);
  const [emojiModalActive, setEmojiModalActive] = useState(false);

  const savePost = async (e) => {
    e.preventDefault();

    const updatedPost = {
      userId: user._id,
      desc: postBody,
      taggedFriends: taggedFriends,
      postLocation: checkInLocation,
      img: currentImage,
    };

    if (imageFile && !currentImage) {
      await uploadFile(imageFile, updatedPost);
    }

    try {
      await updatePost(currentPost._id, user, updatedPost);
      window.location.reload();
    } catch (err) {
      console.error({ err: err, msg: "this is error in saving post" });
    }
  };

  const addEmojiToPost = (value) => {
    setPostBody(postBody + value);
  };

  return (
    <div className="EditPostModal">
      <div className="EditPostModalContent">
        <div className="EditTopBar">
          <h3> Edit post </h3>
          <Close
            className="EditModalCloseIcon"
            onClick={(e) => {
              setModalActive(false);
              setPostIsBeingEdited(false);
            }}
          />
        </div>
        <hr className="EditModalHr" />

        <form className="editForm" onSubmit={savePost}>
          <div className="EditCenter">
            <div className="EditModalUserInfo">
              <ProfilePicture
                userImage={user?.profilePicture}
                classname="shareProfileImg"
              />
              <div>
                {taggedFriends.length > 0 && (
                  <TaggedUsers
                    classname="EditModalTaggedFriends"
                    taggedList={taggedFriends}
                    currentUser={user}
                  />
                )}
                {checkInLocation && (
                  <div className="editLocation">
                    <Public fontSize="x-small" />
                    <span>{checkInLocation.split(",")[0]} </span>
                  </div>
                )}
              </div>
            </div>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="EditModalText"
              ref={postBodyRef}
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)}
            />

            <div className="editPostImageContainer">
              {currentImage && (
                <div className="editPostImageWrapper">
                  <ProfilePicture
                    postImage={currentImage}
                    classname="editPostImage"
                  />
                  <Close
                    className="deleteImageBadge"
                    fontSize="small"
                    onClick={() => setCurrentImage(null)}
                  />
                </div>
              )}

              {imageFile && (
                <div className="editPostImageWrapper">
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt=""
                    className="editPostImage"
                  />
                  <Close
                    className="deleteImageBadge"
                    fontSize="small"
                    onClick={() => setImageFile(null)}
                  />
                </div>
              )}
            </div>

            <div className="AddOns">
              <h4 className="AddOnsText">Add to your post</h4>
              <div className="AddOnsOptions">
                <Suspense fallback={<Loading />}>
                  <label htmlFor="editImagefile" className="AddOnOption">
                    <PermMedia color="success" className="AddOnIcon" />
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="editImagefile"
                      accept=".png,.jpeg,.jpg"
                      onClick={(e) => setCurrentImage(null)}
                      onChange={(e) => setImageFile(e.target.files[0])}
                    />
                  </label>

                  <label htmlFor="tag" className="addOnOption">
                    <PersonAdd
                      color="warning"
                      className="AddOnIcon TagIcon"
                      onClick={() => setTagModalActive(true)}
                    />
                    <TagModal
                      addTaggedList={setTaggedFriends}
                      tagModalActive={tagModalActive}
                      setTagModalActive={setTagModalActive}
                      storedList={currentPost.taggedFriends}
                    />
                  </label>

                  <label htmlFor="emoji" className="addOnOption">
                    <Mood
                      className="AddOnIcon"
                      onClick={() => setEmojiModalActive(true)}
                    />
                    {emojiModalActive && (
                      <EmojiModal
                        emojiModalActive={emojiModalActive}
                        setEmojiModalActive={setEmojiModalActive}
                        addEmojiToPost={addEmojiToPost}
                      />
                    )}
                  </label>

                  <label htmlFor="location" className="addOnOption">
                    <LocationOn
                      className="AddOnIcon LocationIcon"
                      onClick={() => setLocationModalActive(true)}
                    />
                    <SearchLocationModal
                      setLocationModalActive={setLocationModalActive}
                      updateLocation={setCheckInLocation}
                      locationModalActive={locationModalActive}
                    />
                  </label>
                </Suspense>
              </div>
            </div>
          </div>
          <div className="EditModalSave">
            <button
              className="EditModalSaveButton"
              type="submit"
              value="Submit"
              style={{ backgroundColor: "#176cf0", color: "white" }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;
