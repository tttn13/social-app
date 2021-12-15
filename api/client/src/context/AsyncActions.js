import { login, logout } from '../services/auth.service';
import { removeUserFromStorage } from '../services/token.service';
import { handleFollowsAPI } from '../services/user.service';
import {
  LoginFailure,
  LoginStart,
  LoginSuccess,
  LogOut,
  updateFollows,
  updateUnfollows,
} from './AuthActions';

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
    console.log('dispatching logging out failed', { err: error });
  }
  try {
    await logout();
  } catch (error) {
    console.log('calling logging out api failed', { err: error });
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

export const logOutOnExpired = async (dispatch) => {
  console.log('logOutOnExpired async action');
  try {
    await logout();
    dispatch(LogOut());
    removeUserFromStorage();
  } catch (error) {
    console.log('calling logging out api failed', { err: error });
  }
};
