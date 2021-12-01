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
export const UpdateTokenState = ({token, refreshToken}) => ({
  type: "REFRESH_TOKEN",
  payload: {
    token: token,
    refreshToken: refreshToken
  }
});
export const LogOut = () => ({
  type: "LOG_OUT",
});
export const Follow = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});
export const Unfollow = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});
