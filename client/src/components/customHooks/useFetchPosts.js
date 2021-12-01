import { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import { isEmpty, sortByDate } from "../../utils/utils";
import { getTimeline, getPosts } from "../../services/user.service";

export const useFetchPosts = (selectedUserUsername) => {
  const currentUser = useContext(AuthContext).user.user;
  const [posts, setPosts] = useState([]);

  const fetchSelectedUserPosts = async (selectedUserUsername) => {
    try {
      const postresponse = await getPosts(selectedUserUsername);
      const sortedPosts = sortByDate(postresponse.data);
      return sortedPosts;
    } catch (error) {
      console.log("this is error for fetchSelectedUserPosts", {
        error: error.message,
      });
    }
  };

  const fetchCurrentUserPosts = async (user) => {
    if (user) {
      try {
        const response = await getTimeline(user);
        const sortedPosts = sortByDate(response.data);
        return sortedPosts;
      } catch (error) {
        console.log("this is error for fetchCurrentUserPosts", {
          error: error.message,
        });
      }
    }
  };

  // const fetchData = async (currentUser, selectedUserUsername) => {
  //   if (currentUser && !selectedUserUsername) {
  //     const timelinePosts = await fetchCurrentUserPosts(currentUser);
  //     setPosts(timelinePosts);
  //   }

  // if (currentUser && selectedUserUsername) {
  //   const userPosts = await fetchSelectedUserPosts(selectedUserUsername);
  //   setPosts(userPosts);
  // }
  // };

  const fetchData = useCallback(async () => {
    if (currentUser && !selectedUserUsername) {
      const timelinePosts = await fetchCurrentUserPosts(currentUser);
      setPosts(timelinePosts);
    }
    if (currentUser && selectedUserUsername) {
      const userPosts = await fetchSelectedUserPosts(selectedUserUsername);
      setPosts(userPosts);
    }
  }, []);

  // useEffect(() => {
  //   if (!isEmpty(currentUser)) {
  //     fetchData(currentUser, selectedUserUsername);
  //   }
  // }, [selectedUserUsername, currentUser]);
  useEffect(() => {
    if (!isEmpty(currentUser)) {
      fetchData();
    } 
    return () => {
      console.log("clean up in use fetch posts")
    }
  }, []);

  return {
    posts,
    setPosts,
    fetchCurrentUserPosts,
    fetchSelectedUserPosts,
  };
};
