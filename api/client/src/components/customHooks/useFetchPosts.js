import { useCallback, useEffect, useState } from "react";

import { getPosts, getTimeline } from "../../services/user.service";
import { sortByDate } from "../../utils/utils";

export const useFetchPosts = ({ currentUserId, selectedUserUsername }) => {
  const [posts, setPosts] = useState([]);
  const [timeline, setTimeline] = useState([]);

  const fetchSelectedUserPosts = useCallback(async (selectedUserUsername) => {
    try {
      const postresponse = await getPosts(selectedUserUsername);
      const sortedPosts = sortByDate(postresponse.data);
      return sortedPosts;
    } catch (error) {
      console.log("this is error for fetchSelectedUserPosts", {
        error: error.message,
      });
    }
  }, []);

  const fetchCurrentUserPosts = useCallback(async (userId) => {
    try {
      const response = await getTimeline(userId);
      const sortedPosts = sortByDate(response.data);
      return sortedPosts;
    } catch (error) {
      console.log("this is error for fetchCurrentUserPosts", {
        error: error.message,
      });
    }
  }, []);

  useEffect(() => {
    const fetchData = async ({ userId, userName }) => {
      if (userId) {
        const timelinePosts = await fetchCurrentUserPosts(userId);
        setTimeline(timelinePosts);
      } else {
        const userPosts = await fetchSelectedUserPosts(userName);
        setPosts(userPosts);
      }
    };

    if (currentUserId && currentUserId !== null && currentUserId !== undefined ) {
      fetchData({ userId: currentUserId })
    } 
     if (selectedUserUsername && selectedUserUsername !== null && selectedUserUsername !== undefined) {
      fetchData({ userName: selectedUserUsername })
    }

    return () => {
      setPosts([])
      setTimeline([])
    };
  }, [
    currentUserId,
    selectedUserUsername,
    fetchSelectedUserPosts,
    fetchCurrentUserPosts,
  ]);

  return {
    posts,
    timeline,
    fetchCurrentUserPosts,
    fetchSelectedUserPosts,
  };
};
