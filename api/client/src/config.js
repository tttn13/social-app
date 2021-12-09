import axios from "axios"

export const axiosInstance = axios.create({
    baseURL : "https://mysocialappmsa.herokuapp.com/api/"
})
