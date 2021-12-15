import axiosInstance from '../config/config';
import { logOutOnExpired } from '../context/AsyncActions';
import { pause } from '../utils/utils';
import { accessTokenIsExpired } from './axiosJwtInterceptors';
import { setUserInStorage } from './token.service';

export const login = async (userCredentials) => {
  const res = await axiosInstance.post('/auth/login', userCredentials);
  if (res.data.token) {
    setUserInStorage(res.data);
    localStorage.setItem('token', res.data.token);
  }
  return res.data;
};

export const register = (userInfo) => {
  return axiosInstance.post('/auth/register', userInfo);
};

export const logout = () => {
  return axiosInstance.post('/auth/logout');
};

export const checkToken = async ({ dispatch, history }) => {
  if (accessTokenIsExpired()) {
    console.log(' token is expired ');
    await pause(1000);
    await logOutOnExpired(dispatch);
    history.push('/session_expired');
    return false;
  }
  return true;
};
