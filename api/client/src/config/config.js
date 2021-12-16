import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const axiosInstance = createAxiosInstance();

const createAxiosInstance = () => {
  console.log(
    'Initializing Axios Instance with: ' + process.env.REACT_APP_BASE_URL
  );
  return axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });
};
export default axiosInstance;
