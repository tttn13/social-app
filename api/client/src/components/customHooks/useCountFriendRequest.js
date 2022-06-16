import { useCallback, useEffect, useState } from "react";

import { getFriendReqsAPI } from "../../services/user.service";
import { isEmpty } from "../../utils/utils";

export const useCountFriendRequest = ({ currUser }) => {
  const [friendReqs, setFriendReqs] = useState([]);
    
  const fetchReqs = useCallback(async (currUser) => {
    try {
      const res = await getFriendReqsAPI(currUser._id);
      return res.data;
    } catch (err) {
      console.log({
        err: err,
        msg: "error in calling fetchReqs api in useCountFriendRequest",
      });
    }
  }, []);

  useEffect(() => {
    const fetch = async (currUser) => {
      try {
        const potentials = await fetchReqs(currUser)
        setFriendReqs(potentials);
        
      } catch (error) {
        console.log(error);
      }
    };

    if (!isEmpty(currUser) && currUser !== null) {
      fetch(currUser);
    }

    return () => {
      console.log("clean up useCountReqs");
      setFriendReqs([]);
    };
  }, [currUser]);

  return {
    friendReqs,
    setFriendReqs,
    fetchReqs
  };
};
