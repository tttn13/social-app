//a service for accessing data aka Data service
import axiosInstance from "../config/config"
import axiosJWT from "./axiosJwtInterceptors";
//User services
export const getUser = async ({ userId, username }) => {
  // console.log("calling get user api");
  if (userId) {
    return axiosInstance.get(`/users?userId=${userId}`);
  } else {
    return axiosInstance.get(`/users?username=${username}`);
  }
};
export const getUserById = async ({ userId }) => {
  // console.log("calling getUserById api");
  return axiosInstance.get(`/users?userId=${userId}`);
};

export const getUserByName = async ({ username }) => {
  // console.log("calling getUserByName api");
  return axiosInstance.get(`/users?username=${username}`);
};

export const getFriendsAPI = async (user) => {
  // console.log("calling getFriendsAPI");
  return axiosInstance.get(`/users/friends/${user?._id}`);
};

export const handleFollowsAPI = async (currentUserId, selectedUserId) => {
  // console.log("calling axios followUser");
  return axiosInstance.put(`/users/${selectedUserId}/follow`, {
    userId: currentUserId,
  });
};
//Posts Services
export const getTimeline = async (userId) => {
  // console.log("calling getTimeline");
  return axiosInstance.get(`/posts/timeline/${userId}`);
};

export const getPosts = async (selectedUsername) => {
  // console.log("calling getPosts of", selectedUsername);
  return axiosInstance.get(`/posts/profile/${selectedUsername}`);
};

export const createPost = async (post) => {
  // console.log("calling createPost");
  return axiosJWT.post("/posts", post);
};

export const updatePost = async (postId, user, newPost) => {
  // console.log("calling updatePost");
  return axiosInstance.put(`/posts/${postId}`, newPost, {
    data: {
      userId: user._id,
    },
  });
};

export const deletePost = async (postId, userId) => {
  // console.log("calling deletePost");
  return axiosInstance.delete(`/posts/${postId}`, {
    data: {
      userId: userId,
    },
  });
};

export const likePost = async (postId, currUserId) => {
  // console.log("calling likePost");
  return axiosInstance.put(`posts/${postId}/like`, { userId: currUserId });
};

export const uploadFile = async (file, newPost) => {
  const data = new FormData();
  const fileName = Date.now() + file.name;
  data.append("name", fileName);
  data.append("file", file);
  newPost.img = fileName;
  try {
    await axiosInstance.post("/upload", data);
  } catch (err) {
    console.error(err);
  }
};

//Comment Services
export const createComment = async (postId, comment) => {
  // console.log("calling createComment");
  return axiosInstance.post(`/comments/${postId}`, comment);
};

export const getComment = async (commentId) => {
  // console.log("calling getComment");
  return axiosInstance.get(`/comments/${commentId}`);
};

export const deleteComment = async (commentId, userId) => {
  // console.log("calling deleteComment");
  return axiosInstance.delete(`/comments/${commentId}`, {
    data: {
      userId: userId,
    },
  });
};

export const updateComment = async (cmtId, userId, body) => {
  // console.log("calling updateComment");
  return axiosInstance.put(`/comments/${cmtId}`, {
    userId,
    body,
  });
};
