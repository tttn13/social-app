import axios from "axios";

const axiosJWT = axios.create();
axiosJWT.CancelToken = axios.CancelToken
axiosJWT.isCancel = axios.isCancel
export default axiosJWT;
