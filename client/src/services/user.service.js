//a service for accessing data aka Data service
import axiosJWT from "./axiosJWT";
import axios from "axios";

//User services
// export const getUser = async (userId, username) => {
//   if (!username) {
//     return axiosJWT.get(`/users?userId=${userId}`)
//   } else {
//     return axiosJWT.get(`/users?username=${username}`)
//   }
// }

// export const getFriendsAPI = async(user) => {
//   return axiosJWT.get(`/users/friends/${user._id}`)
// }

// export const unfollowUser = async (currentUserId, selectedUserId) => {
//   return axiosJWT.put(`/users/${selectedUserId}/unfollow`, {
//     userId: currentUserId,
//   });
// }

// export const followUser = async (currentUserId, selectedUserId) => {
//   return axiosJWT.put(`/users/${selectedUserId}/follow`, {
//     userId: currentUserId,
//   });
// }
// //Posts Services
// export const getTimeline = async (user) => {
//   return axiosJWT.get(`/posts/timeline/${user._id}`);
// };

// export const getPosts = async (selectedUsername) => {
//   return axiosJWT.get(`/posts/profile/${selectedUsername}`)
// }

// export const createPost = async (post) => {
//   return axiosJWT.post("/posts", post);
// };

// export const updatePost = async (postId, user, newPost) => {
//   return axiosJWT.put(`/posts/${postId}`, newPost, {
//     data: {
//       userId: user._id,
//     },
//   });
// };

// export const deletePost = async (postId, userId) => {
//   return axiosJWT.delete(`/posts/${postId}`, {
//     data: {
//       userId: userId,
//     },
//   });
// };

// export const likePost = async (postId, currUserId) => {
//   return axiosJWT.put(`posts/${postId}/like`, { userId: currUserId });
// };

// export const uploadFile = async (file, newPost) => {
//   const data = new FormData();
//   const fileName = Date.now() + file.name;
//   data.append("name", fileName);
//   data.append("file", file);
//   newPost.img = fileName;
//   try {
//     await axios.post("/upload", data);
//   } catch (err) {
//     console.error(err);
//   }
// };

// //Comment Services
// export const createComment = async (postId, comment) => {
//   return axiosJWT.post(`/comments/${postId}`, comment);
// };

// export const getComment = async (commentId) => {
//   return axiosJWT.get(`/comments/${commentId}`);
// };

// export const deleteComment = async (commentId, userId) => {
//   return axiosJWT.delete(`/comments/${commentId}`, {
//     data: {
//       userId: userId,
//     },
//   });
// };

// export const updateComment = async (cmtId, userId, body) => {
//   return axiosJWT.put(`/comments/${cmtId}`, {
//     userId,
//     body,
//   });
// };

export const getUser = async (userId, username) => {
  console.log("calling get user api")
  if (!username) {
    return axiosJWT.get(`/users?userId=${userId}`)
  } else {
    return axiosJWT.get(`/users?username=${username}`)
  }
}

export const getFriendsAPI = async(user) => {
  console.log("calling getFriendsAPI")
  return axiosJWT.get(`/users/friends/${user._id}`)
}

export const unfollowUser = async (currentUserId, selectedUserId) => {
  console.log("calling unfollowUser")
  return axiosJWT.put(`/users/${selectedUserId}/unfollow`, {
    userId: currentUserId,
  });
}

export const followUser = async (currentUserId, selectedUserId) => {
  console.log("calling followUser")
  return axiosJWT.put(`/users/${selectedUserId}/follow`, {
    userId: currentUserId,
  });
}
//Posts Services
export const getTimeline = async (user) => {
  console.log("calling getTimeline")
  return axiosJWT.get(`/posts/timeline/${user._id}`);
};

export const getPosts = async (selectedUsername) => {
  console.log("calling getPosts")
  return axiosJWT.get(`/posts/profile/${selectedUsername}`)
}

export const createPost = async (post) => {
  console.log("calling createPost")
  return axiosJWT.post("/posts", post);
};

export const updatePost = async (postId, user, newPost) => {
  console.log("calling updatePost")
  return axiosJWT.put(`/posts/${postId}`, newPost, {
    data: {
      userId: user._id,
    },
  });
};

export const deletePost = async (postId, userId) => {
  console.log("calling deletePost")
  return axiosJWT.delete(`/posts/${postId}`, {
    data: {
      userId: userId,
    },
  });
};

export const likePost = async (postId, currUserId) => {
  console.log("calling likePost")
  return axiosJWT.put(`posts/${postId}/like`, { userId: currUserId });
};

export const uploadFile = async (file, newPost) => {
  const data = new FormData();
  const fileName = Date.now() + file.name;
  data.append("name", fileName);
  data.append("file", file);
  newPost.img = fileName;
  try {
    await axios.post("/upload", data);
  } catch (err) {
    console.error(err);
  }
};

//Comment Services
export const createComment = async (postId, comment) => {
  console.log("calling createComment")
  return axiosJWT.post(`/comments/${postId}`, comment);
};

export const getComment = async (commentId) => {
  console.log("calling getComment")
  return axiosJWT.get(`/comments/${commentId}`);
};

export const deleteComment = async (commentId, userId) => {
  console.log("calling deleteComment")
  return axiosJWT.delete(`/comments/${commentId}`, {
    data: {
      userId: userId,
    },
  });
};

export const updateComment = async (cmtId, userId, body) => {
  console.log("calling updateComment")
  return axiosJWT.put(`/comments/${cmtId}`, {
    userId,
    body,
  });
};