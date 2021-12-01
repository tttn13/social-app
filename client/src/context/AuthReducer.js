const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        isFetching: false,
        error: true,
      };
    case "REFRESH_TOKEN":
      return {
        ...state,
        user: {
          ...state.user,
          token: action.payload.token,
          refreshToken: action.payload.refreshToken,
        }
      }
    case "LOG_OUT":
      console.log("logg out in reducer")
      return {
        ...state,
        user: null,
        isFetching: false,
        isLoggedIn: false,
        error: false
      };
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (following) => following !== action.payload
          ),
        },
      };

    default:
      return state;
  }
};

export default AuthReducer;
