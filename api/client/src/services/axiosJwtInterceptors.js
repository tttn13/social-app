import axios from "axios";
import dotenv from 'dotenv';
import jwt_decode from "jwt-decode";

import { getToken } from "./token.service";

dotenv.config();
const axiosJWT = axios.create({
  baseURL : process.env.REACT_APP_BASE_URL
});
axiosJWT.interceptors.request.use(
  async (config) => {
    config.headers.authorization = `Bearer ${getToken()}`;
    return config;
  },
  (error) => {
    console.log("this is error in interceptor request");
    return Promise.reject(error);
  }
);

export const decodedAccessToken = () => {
  if (getToken()) return jwt_decode(getToken());
};

export const getCurrentTime = () => {
  return new Date().getTime();
};

export const accessTokenIsExpired = () => {
  return decodedAccessToken().exp * 1000 < getCurrentTime();
};

export default axiosJWT;
