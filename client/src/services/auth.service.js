//The service uses Axios for HTTP requests and Local Storage for user information & JWT.
import axios from "axios";
import {
  setUserInStorage,
  getRefreshToken,
} from "./token.service";

export const login = async (userCredentials) => {
  console.log("calling login")
  const res = await axios.post("/auth/login", userCredentials);
  if (res.data.token) {
    setUserInStorage(res.data);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("refreshToken", res.data.refreshToken);
  }
  return res.data;
};

export const register = (userInfo) => {
  console.log("calling register")
  return axios.post("/auth/register", userInfo);
};

export const logout =  () => {
  console.log("calling logout")
  return axios.post("/auth/logout");
};

export const getNewAccessToken = () => {
  console.log("calling getNewAccessToken")
  return axios.post("/auth/refresh", {
    refreshToken: getRefreshToken(),
  });
};
