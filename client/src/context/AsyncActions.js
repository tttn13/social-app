import {
  LoginFailure,
  LoginStart,
  LoginSuccess,
  LogOut,
  UpdateTokenState,
  Follow,
  Unfollow,
} from "./AuthActions";
import { login, logout, getNewAccessToken } from "../services/auth.service";
import { removeUserFromStorage } from "../services/token.service";
import { unfollowUser, followUser } from "../services/user.service";

export const loginUser = async (userCredentials, dispatch) => {
  removeUserFromStorage();
  dispatch(LoginStart());
  try {
    const res = await login(userCredentials);
    dispatch(LoginSuccess(res));
  } catch (error) {
    dispatch(LoginFailure());
  }
};

export const logoutUser = async (dispatch) => {
  try {
    dispatch(LogOut());
    removeUserFromStorage();
  } catch (error) {
    console.log("dispatching logging out failed", { err: error });
  }
  try {
    await logout();
  } catch (error) {
    console.log("calling logging out api failed", { err: error });
  }
};

export const updateTokens = async (dispatch) => {
  try {
    const res = await getNewAccessToken();
    console.log("a new accesstoken is generated");
    dispatch(
      UpdateTokenState({
        token: res.data.token,
        refreshToken: res.data.refreshToken,
      })
    );
    return res?.data;
  } catch (error) {
    console.log("calling update access token failed", { err: error });
  }
};

export const handleUnfollow = async (
  currentUserId,
  selectedUserId,
  dispatch
) => {
  try {
    await unfollowUser(currentUserId, selectedUserId);
    dispatch(Unfollow(selectedUserId));
  } catch (error) {
    console.error(error);
  }
};

export const handleFollow = async (currentUserId, selectedUserId, dispatch) => {
  try {
    await followUser(currentUserId, selectedUserId);
    dispatch(Follow(selectedUserId));
  } catch (error) {
    console.error(error);
  }
};
