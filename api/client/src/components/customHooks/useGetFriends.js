import { useCallback, useEffect, useState } from "react";

import { getFriendsAPI } from "../../services/user.service";
import { isEmpty } from "../../utils/utils";

export const useGetFriends = (currentUser) => {
  const [friends, setFriends] = useState([]);

  const getFriends = useCallback(async (user) => {
    try {
      const res = await getFriendsAPI(user);
      return res.data;
    } catch (err) {
      console.log({
        err: err,
        msg: "error in calling get friends api in useGetFriends",
      });
    }
  }, []);

  useEffect(() => {
    const fetchData = async (currentUser) => {
      try {
        const res = await getFriends(currentUser);
        setFriends(res);
      } catch (error) {
        console.log({
          err: error,
          msg: "error in fetchData friends api in useGetFriends",
        });
      }
    };

    if (currentUser && currentUser !== null  && !isEmpty(currentUser)) {
      fetchData(currentUser);
    }

    return () => {
      setFriends([]);
    };
  }, [currentUser, getFriends]);

  return {
    friends,
    getFriends,
  };
};
