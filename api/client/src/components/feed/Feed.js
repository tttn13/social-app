import { useState, useEffect } from "react";
import { useFetchPosts } from "../../components/customHooks/useFetchPosts";
import { isEmpty, sortByDate } from "../../utils/utils";
import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import {
  deletePost,
  createPost,
  uploadFile,
} from "../../services/user.service";
import Loading from "../../pages/Loading";
import { useParams } from "react-router-dom";

const Feed = ({ currentUser }) => {
  const selectedUsername = useParams().username;
  const [currentUserTimeline, setCurrentUserTimeline] = useState([]);
  const [isHomePage, setIsHomePage] = useState(selectedUsername ? false : true);
  const { fetchCurrentUserPosts: getAllPosts } = useFetchPosts({ currentUserId: currentUser?._id});
  const { fetchSelectedUserPosts: getUserPosts } = useFetchPosts({ selectedUserUsername: selectedUsername });

  useEffect(() => {
    const fetchData = async (userId, selectedUsername) => {
      let posts = [];
      if (isHomePage) {
        posts = await getAllPosts(userId)
      } else {
        posts = await getUserPosts(selectedUsername)
      }
      setCurrentUserTimeline(posts);
    };

    currentUser && !isEmpty(currentUser) && fetchData(currentUser._id,selectedUsername);
    return () => setCurrentUserTimeline([])
  }, [currentUser, selectedUsername, isHomePage, getAllPosts, getUserPosts]);

  const handleDeletePost = async (deletedPostId, userId) => {
    await deletePost(String(deletedPostId), String(userId));
    setCurrentUserTimeline(currentUserTimeline.filter((p) => p._id !== deletedPostId));
  };

  const handleSubmitPost = async (newPost, attachedFile) => {
    if (attachedFile) {
      await uploadFile(attachedFile, newPost);
    }
    try {
      const res = await createPost(newPost);
      const combinedPosts = [].concat(currentUserTimeline, res.data);
      setCurrentUserTimeline(sortByDate(combinedPosts));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="feed">
      <div className="feedWrapper">
        {currentUser && (isHomePage || currentUser.username === selectedUsername) && (
          <Share user={currentUser} addNewPost={handleSubmitPost} />
        )}
        {currentUserTimeline ? (
          currentUserTimeline.map((p) => (
            <Post key={p._id} post={p} handleDeletePost={handleDeletePost} />
          ))
        ) : (
          <Loading />
        )}
        
      </div>
    </div>
  );
};

export default Feed;
