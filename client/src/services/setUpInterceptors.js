import { updateTokens, logoutUser } from "../context/AsyncActions";
import jwt_decode from "jwt-decode";
import { getToken, getRefreshToken } from "./token.service";

const setUpInterceptors = (axiosJWT, store) => {
  console.log("setting up interceptors");
  const { dispatch, user } = store;
  if (refTokenIsExpired() || user == null) {
    console.log("refTokenIsExpired is true")
    
    return logoutUser(dispatch)
  } else {
    console.log("refTokenIsExpired is false")
    axiosJWT.interceptors.request.use(
      axiosJWT.interceptors.request.use(
        async (config) => {
          // console.log("config is", config.headers)
          let token;
          if (accessTokenIsExpired()) {
            console.log("only access token is expired");
            const res = await updateTokens(dispatch);
            token = res.token
            console.log("res.token is", res.token)
          } else {
            console.log(" access token is not expired");
            token = getToken()
          }
          config.headers.authorization = `Bearer ${token}`;
          
          return config;
        },
        (error) => {
          console.log("this is error in interceptor request")
          return Promise.reject(error);
        }
    ))
    axiosJWT.interceptors.response.use(
      async (res) => { 
        return res 
      },
      async (error) => {
        console.log("originalRequest in response is", error)
        const status = error.response ? error.response.status : null
        const originalRequest = error.config
        if (status === 401 || status === 403) {
          
          // const tokensRes = await updateTokens(dispatch)
          // originalRequest.headers['Authorization'] = `Bearer ${tokensRes.token}`
          return axiosJWT.request(originalRequest);
        } else {
          console.error(error)
        }
        return Promise.reject(error);
        }
    );
  }
}

    // const cancelRequest = (config) => {
    //   return {
    //     ...config,
    //     cancelToken: new CancelToken((cancel) =>
    //       cancel("cancel repeated requests")
    //     ),
    //   };
    // };
    //   async (config) => {
    //       console.log("access token is expired",decodedAccessToken().exp * 1000 < getCurrentTime());
    //       if (decodedAccessToken().exp * 1000 < getCurrentTime()) {
    //         if (decodedRefToken().exp * 1000 < getCurrentTime()) {
    //           // back to log in
    //           console.log("logging out user because refTokenExpired");
    //           await logoutUser(dispatch);
    //           return cancelRequest(config);
    //         } else {
    //           console.log("only access token is expired");
    //           const res = await updateTokens(dispatch);
    //           config.headers.authorization = `Bearer ${res.token}`;
    //           return config;
    //         }
    //       } else {
    //         config.headers.authorization = `Bearer ${getToken()}`;
    //         return config;
    //       }
    //   },
    //   (error) => {
    //     return Promise.reject(error);
    //   }
    // );
    // axiosJWT.interceptors.response.use(
    //   async (res) => { return res },
    //   async (error) => {
    //     const status = error.response ? error.response.status : null
    //     console.log("status of response is", status)
    //     const originalRequest = error.config
    //     if (status === 401) {
    //       const tokensRes = await updateTokens(dispatch)
    //       originalRequest.headers['Authorization'] = `Bearer ${tokensRes.token}`
    //       return axiosJWT.request(originalRequest);
    //     } else {
    //       console.error(error)
    //     }
    //     return Promise.reject(error);
    //     }
    // );

const decodedRefToken = () => {
  if (getRefreshToken()) return jwt_decode(getRefreshToken());
};

const decodedAccessToken = () => {
  if (getToken()) return jwt_decode(getToken());
};

const getCurrentTime = () => {
  return new Date().getTime();
};

const accessTokenIsExpired = () => {
  return decodedAccessToken().exp * 1000 < getCurrentTime()
}

const refTokenIsExpired = () => {
  return decodedRefToken().exp * 1000 < getCurrentTime()
}

export default setUpInterceptors;
