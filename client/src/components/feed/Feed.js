import { useState, useEffect, useContext, useCallback } from "react";
import { useFetchPosts } from "../../components/customHooks/useFetchPosts";
import { isEmpty, sortByDate } from "../../utils/utils";
import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { AuthContext } from "../../context/AuthContext";
import { deletePost,createPost, uploadFile } from "../../services/user.service";
import Loading from "../Loading"

const Feed = ({ usernameFromParams }) => {
  const user = useContext(AuthContext).user.user;
  const { fetchCurrentUserPosts: getAllPosts } = useFetchPosts();
  const [currentUserTimeline, setCurrentUserTimeline] = useState([]);

  // const fetchData = async () => {
  //   const posts = await getAllPosts(user);
  //   setCurrentUserTimeline(posts);
  // };

  const fetchData = useCallback(
    async () => {
      const posts = await getAllPosts(user);
      setCurrentUserTimeline(posts);
    },
    [],
  )

  useEffect(() => {
    !isEmpty(user) && fetchData();
    
  }, [user, fetchData]);

  const handleDeletePost = async (deletedPostId, userId) => {
    await deletePost(String(deletedPostId), String(userId));
    setCurrentUserTimeline(
      currentUserTimeline.filter((p) => p._id !== deletedPostId)
    );
  };

  const handleSubmitPost = async (newPost, attachedFile) => {
    if (attachedFile) {
      await uploadFile(attachedFile, newPost);
    }
    try {
      const res =  await createPost(newPost);
      const combinedPosts = [].concat(currentUserTimeline, res.data)
      setCurrentUserTimeline(sortByDate(combinedPosts));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!usernameFromParams || usernameFromParams === user.username) && (
          <Share user={user} addNewPost={handleSubmitPost}/>
        )}
        {/* {currentUserTimeline.length > 0 &&
          currentUserTimeline.map((p) => <Post key={p._id} post={p} handleDeletePost={handleDeletePost}/>)} */}
          {currentUserTimeline.length > 0 
          ? currentUserTimeline.map((p) => <Post key={p._id} post={p} handleDeletePost={handleDeletePost}/>)
          : <Loading /> 
          }
          </div>
    </div>
  );
};

export default Feed;
