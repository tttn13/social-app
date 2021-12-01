import { useState, useEffect } from "react";
import { getComment } from "../../services/user.service";

export const useFetchComments = (commentsIds) => {
  const [commentsList, setCommentsList] = useState([]);

  const fetchComments = async (commentsIds) => {
    try {
      let newList = [];
      commentsIds.map(async (id) => {
        const res = await getComment(id);
        newList.push(res.data);
      });
      return newList;
    } catch (error) {
      console.log("this is error for fetchComments", {
        error: error.message,
      });
      console.error(error);
      return [];
    }
  };

  const fetchData = async (cmts) => {
    const res = await fetchComments(cmts);
    setCommentsList(res);
  };

  useEffect(() => {
    if (commentsIds !== "undefined" && commentsIds.length > 0) {
      fetchData();
    }
    return () => {
      console.log("clean up in useFetch comments")
    }
  }, []);

  return {
    commentsList,
    fetchComments,
    setCommentsList,
  };
};
