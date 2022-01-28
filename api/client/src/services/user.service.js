//a service for accessing data aka Data service
import axiosInstance from '../config/config';
import axiosJWT from './axiosJwtInterceptors';
//User services
export const getUser = async ({ userId, username }) => {
  if (userId) {
    return axiosInstance.get(`/users?userId=${userId}`);
  } else {
    return axiosInstance.get(`/users?username=${username}`);
  }
};
export const getUserById = async ({ userId }) => {
  return axiosInstance.get(`/users?userId=${userId}`);
};

export const getUserByName = async ({ username }) => {
  return axiosInstance.get(`/users?username=${username}`);
};

export const getFriendsAPI = async (userId) => {
  return axiosInstance.get(`/users/friends/${userId}`);
};

export const handleFollowsAPI = async (currentUserId, selectedUserId) => {
  return axiosInstance.put(`/users/${selectedUserId}/follow`, {
    userId: currentUserId,
  });
};
//Posts Services
export const getTimeline = async (userId) => {
  return axiosInstance.get(`/posts/timeline/${userId}`);
};

export const getPosts = async (selectedUsername) => {
  return axiosInstance.get(`/posts/profile/${selectedUsername}`);
};

export const createPost = async (post) => {
  return axiosJWT.post('/posts', post);
};

export const updatePost = async (postId, user, newPost) => {
  return axiosInstance.put(`/posts/${postId}`, newPost, {
    data: {
      userId: user._id,
    },
  });
};

export const deletePost = async (postId, userId) => {
  return axiosInstance.delete(`/posts/${postId}`, {
    data: {
      userId: userId,
    },
  });
};

export const likePost = async (postId, currUserId) => {
  return axiosInstance.put(`posts/${postId}/like`, { userId: currUserId });
};

export const uploadFile = async (file, newPost) => {
  const data = new FormData();
  const fileName = Date.now() + file.name;
  data.append('name', fileName);
  data.append('file', file);
  newPost.img = fileName;
  try {
    await axiosInstance.post('/upload', data);
  } catch (err) {
    console.error(err);
  }
};

//Comment Services
export const createComment = async (postId, comment) => {
  return axiosInstance.post(`/comments/${postId}`, comment);
};

export const getComment = async (commentId) => {
  return axiosInstance.get(`/comments/${commentId}`);
};

export const deleteComment = async (commentId, userId) => {
  return axiosInstance.delete(`/comments/${commentId}`, {
    data: {
      userId: userId,
    },
  });
};

export const updateComment = async (cmtId, userId, body) => {
  return axiosInstance.put(`/comments/${cmtId}`, {
    userId,
    body,
  });
};
