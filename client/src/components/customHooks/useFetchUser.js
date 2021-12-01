import { useState, useEffect } from "react";
import { getUser } from "../../services/user.service";

export const useFetchUser = ({ userId, username }) => {
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(true);

  const fetchUser = async (userId, username) => {
    try {
      const response = await getUser(userId, username)
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    if (userId || username) {
      fetchUser(userId, username);
    } 
    return () => {
      console.log("clean up in useFetchUser")
    }
  }, [userId, username]);

  return {
    user,
    setUser,
    isLoading
  };
};
