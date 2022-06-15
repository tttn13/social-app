import { login, logout, register } from "../services/auth.service";
import { removeUserFromStorage } from "../services/token.service";
import { handleAddFriendAPI,handleFollowsAPI, handleUnFriendAPI } from "../services/user.service";
import {
  LoginFailure,
  LoginStart,
  LoginSuccess,
  LogOut,
  unFriend,
  updateFollows,
  updateFriendsList,
  updateUnfollows} from "./AuthActions";

export const loginUser = async (userCredentials, dispatch) => {
  removeUserFromStorage();
  dispatch(LoginStart());
  try {
    const res = await login(userCredentials);
    dispatch(LoginSuccess(res));
  } catch (error) {
    dispatch(LoginFailure({ error_response: error.response }));
  }
};

export const registerUser = async ({ user, dispatch, history }) => {
  try {
    await register(user);
    history.push("/login");
  } catch (error) {
    dispatch(LoginFailure({ error_response: error.response }));
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

export const handleFollow = async ({
  currentUserId,
  selectedUserId,
  followedSelectedUser,
  dispatch,
}) => {
  try {
    await handleFollowsAPI(currentUserId, selectedUserId);
    if (followedSelectedUser) {
      dispatch(updateUnfollows(selectedUserId));
    } else {
      dispatch(updateFollows(selectedUserId));
    }
  } catch (error) {
    console.error(error);
  }
};

export const handleAddFriend = async ({
  currentUserId,
  selectedUserId,
  dispatch,
}) => {
  try {
    await handleAddFriendAPI(currentUserId, selectedUserId);
    dispatch(updateFriendsList(selectedUserId));
  } catch (error) {
    console.error(error);
  }
};

export const handleUnfriend = async ({
  currentUserId,
  selectedUserId,
  dispatch,
}) => {
  try {
    await handleUnFriendAPI(currentUserId, selectedUserId);
    dispatch(unFriend(selectedUserId));
  } catch (error) {
    console.error(error);
  }
};

export const handleAddFriendBtn = async ({
  currentUserId,
  selectedUserId,
  followedSelectedUser,
  dispatch,
}) => {

  try {
    await handleAddFriendAPI(currentUserId, selectedUserId);
    if (followedSelectedUser) {
      dispatch(unFriend(selectedUserId));
    } else {
      dispatch(updateFriendsList(selectedUserId));
    }
  } catch (error) {
    console.error(error);
  }
};

export const logOutOnExpired = async (dispatch) => {
  try {
    await logout();
    dispatch(LogOut());
    removeUserFromStorage();
  } catch (error) {
    console.log("calling logging out api failed", { err: error });
  }
};
