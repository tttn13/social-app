import { useState, useEffect, useCallback } from "react";
import { isEmpty } from "../../utils/utils";
import { getFriendsAPI } from "../../services/user.service";

export const useGetFriends = (currentUser) => {
  const [friends, setFriends] = useState([]);

  const getFriends = async (user) => {
    try {
      console.log("calling getFriendsAPI in useGetFriends");
      const res = await getFriendsAPI(user);
      return res.data;
    } catch (err) {
      console.log({
        err: err,
        msg: "error in calling get friends api in useGetFriends",
      });
    }
  };

  const fetchData = useCallback(async () => {
    const friends = await getFriends(currentUser);
    setFriends(friends);
  }, [currentUser]);

  useEffect(() => {
    // const fetchData = async () => {
    //   if (!isEmpty(currentUser)) {
    //     const friends = await getFriends(currentUser);
    //     setFriends(friends);
    //   }
    // };
    if (!isEmpty(currentUser)) fetchData();
    return () => {
      console.log("clean up in useGetFriends");
    };
  }, [currentUser, fetchData]);

  return {
    friends,
    getFriends,
  };
};
