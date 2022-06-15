export const LoginStart = () => ({
  type: 'LOGIN_START',
});
export const LoginSuccess = (user) => ({
  type: 'LOGIN_SUCCESS',
  payload: user,
});
export const LoginFailure = ({ error_response }) => ({
  type: 'LOGIN_FAILURE',
  payload: {
    error_response: error_response,
  },
});
export const ResetError = () => ({
  type: 'RESET_ERROR',
});
export const LogOut = () => ({
  type: 'LOG_OUT',
});
export const updateFollows = (userId) => ({
  type: 'UPDATE_FOLLOW',
  payload: userId,
});
export const updateUnfollows = (userId) => ({
  type: 'UPDATE_UNFOLLOW',
  payload: userId,
});
export const updateFriendsList = (userId) => ({
  type: 'ADD_FRIEND',
  payload: userId,
});