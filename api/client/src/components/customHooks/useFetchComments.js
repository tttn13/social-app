import { useCallback,useEffect, useState } from "react";

import { getComment } from "../../services/user.service";

export const useFetchComments = (commentsIds) => {
  const [commentsList, setCommentsList] = useState([]);

  const fetchComments = useCallback(async (commentsIds) => {
    try {
      let newList = [];
      commentsIds.map(async (id) => {
        const res = await getComment(id);
        newList.push(res.data);
      });
      return newList;
    } catch (error) {
      console.error({ err: error, msg: "this is error for fetchComments" });
    }
  }, []);

  useEffect(() => {
    const fetchData = async (cmts) => {
      const res = await fetchComments(cmts);
      setCommentsList(res);
    };
    commentsIds &&
      commentsIds !== "undefined" &&
      commentsIds.length > 0 &&
      fetchData();

    return () => {
      setCommentsList([]);
    };
  }, [commentsIds, fetchComments]);

  return {
    commentsList,
    fetchComments,
  };
};
