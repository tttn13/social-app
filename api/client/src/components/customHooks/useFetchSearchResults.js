import { useCallback, useEffect, useState } from 'react';

import { combineAllResults, isEmpty } from '../../utils/utils';
import { useFetchPosts } from './useFetchPosts';
import { useGetFriends } from './useGetFriends';

export const useFetchSearchResults = ({ user, searchQuery }) => {
  const [results, setResults] = useState([]);

  const { getFriends } = useGetFriends(user);
  const { fetchCurrentUserPosts: getAllPosts } = useFetchPosts({
    currentUserId: user?._id,
  });

  const fetchRes = useCallback(
    async (user, searchQuery) => {
      const friends = await getFriends(user);
      const posts = await getAllPosts(user._id);
      if (friends && posts) {
        const allRes = combineAllResults(user, searchQuery, friends, posts);
        return allRes;
      }
    },
    [getAllPosts, getFriends]
  );

  useEffect(() => {
    const fetchData = async (user, searchQuery) => {
      const allRes = await fetchRes(user, String(searchQuery));
      isEmpty(allRes)
        ? setResults([{ _id: -100, desc: 'No results found ' }])
        : setResults(allRes);
    };

    if (!isEmpty(user) && searchQuery) {
      fetchData(user, searchQuery);
    }
    return () => {
      console.log('clean up in use fetch search res');
    };
  }, [user, searchQuery, fetchRes]);

  return {
    results,
    fetchRes,
    setResults,
  };
};
