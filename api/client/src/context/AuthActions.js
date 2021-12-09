export const LoginStart = () => ({
  type: "LOGIN_START",
});
export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});
export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const LogOut = () => ({
  type: "LOG_OUT",
});
export const updateFollows = (userId) => ({
  type: "UPDATE_FOLLOW",
  payload: userId,
});
export const updateUnfollows = (userId) => ({
  type: "UPDATE_UNFOLLOW",
  payload: userId,
});