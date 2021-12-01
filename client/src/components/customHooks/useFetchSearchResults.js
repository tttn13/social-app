import { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import { isEmpty } from "../../utils/utils";
import { useFetchPosts } from "./useFetchPosts";
import { useGetFriends } from "./useGetFriends";

export const useFetchSearchResults = ({ searchQuery }) => {
  const user = useContext(AuthContext).user.user;
  const [results, setResults] = useState([]);
  const { getFriends } = useGetFriends(user);
  const { fetchCurrentUserPosts: getAllPosts } = useFetchPosts();

  const getFriendsSearchResults = (searchInput, friendsList) => {
    const friendMatches = friendsList.filter((fr) =>
      fr.username.toLowerCase().startsWith(searchInput.toLowerCase())
    );
    return friendMatches;
  };

  const getResults = (user, searchInput, friendsList, postsList) => {
    const allUsers = [...friendsList, user];
    const friendMatches = allUsers.filter((fr) =>
      fr.username.toLowerCase().startsWith(searchInput.toLowerCase())
    );
    const postMatches = postsList.filter((p) =>
      p.desc.toLowerCase().includes(searchInput.toLowerCase())
    );
    const allResults = friendMatches.concat(postMatches);
    return allResults;
  };

  const fetchRes = useCallback(async () => {
    const friends = await getFriends(user);
    const posts = await getAllPosts(user);
    if (friends && posts) {
      const allRes = getResults(user, searchQuery, friends, posts);
      return allRes;
    }
  }, [user, searchQuery, getFriends, getAllPosts]);

  // const fetchRes = async (searchQuery) => {
  //   const friends = await getFriends(user);
  //   const posts = await getAllPosts(user);
  //   if (friends && posts) {
  //     const allRes = getResults(user, searchQuery, friends, posts);
  //     return allRes;
  //   }
  //   };

  const fetchData = useCallback(async () => {
    if (!isEmpty(user)) {
      const allRes = await fetchRes(String(searchQuery));
      isEmpty(allRes)
        ? setResults([{ _id: -100, desc: "No results found " }])
        : setResults(allRes);
    }
  }, [user, fetchRes, searchQuery]);

  // const fetchData = async (searchQuery) => {
  //   if (!isEmpty(user)) {
  //     const allRes = await fetchRes(String(searchQuery));
  //     isEmpty(allRes)
  //       ? setResults([{ _id: -100, desc: "No results found " }])
  //       : setResults(allRes);
  //   }
  // };

  useEffect(() => {
    if (searchQuery) {
      fetchData();
    }
    return () => {
      console.log("clean up in use fetch search res");
    };
  }, [searchQuery, fetchData]);

  return {
    results,
    fetchRes,
    setResults,
    getResults,
    getFriendsSearchResults,
  };
};
