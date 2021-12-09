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
    case "LOG_OUT":
      return {
        ...state,
        user: null,
        isFetching: false,
        isLoggedIn: false,
        error: false
      };
    case "UPDATE_FOLLOW":
      console.log(action.payload)
      return {
        ...state,
        user: {
          ...state.user,
          user : {
            ...state.user.user,
            followings: [...state.user.user.followings, action.payload],
          }
        },
      };
    case "UPDATE_UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          user : {
            ...state.user.user,
            followings: state.user.user.followings.filter((following) => following !== action.payload),
          }
        },
      };
    default:
      return state;
  }
};

export default AuthReducer;
