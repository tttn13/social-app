import { useCallback, useEffect, useState } from "react";

import { getUserById, getUserByName } from "../../services/user.service";

export const useFetchUser = ({ userId, username }) => {
  const [user, setUser] = useState({});

  const fetchUser = useCallback(async ({ user_id, user_name }) => {
    if (user_id && !user_name) {
      try {
        const response = await getUserById({ userId: user_id });
        return response.data;
      } catch (error) {
        console.error({ err: error, msg: "error in fetching user by id" });
      }
    } else if (!user_id && user_name) {
      try {
        const response = await getUserByName({ username: user_name });
        return response.data;
      } catch (error) {
        console.error({ err: error, msg: "error in fetching user by name" });
      }
    }
  }, []);

  useEffect(() => {
    const getData = async ({ userId, userName }) => {
      try {
        const res = await fetchUser({ user_id: userId, user_name: userName });
        setUser(res);
      } catch (error) {
        console.error({ err: error, msg: "error in getData in useFetch User" });
      }
    };

    if (userId) {
      getData({ userId: userId });
    } else {
      getData({ userName: username });
    }

    return () => {
      setUser({});
    };
  }, [userId, username, fetchUser]);

  return {
    user,
  };
};
