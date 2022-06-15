const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        user: null,
        isFetching: true,
        error: false,
        error_response: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        isFetching: false,
        error: false,
        error_response: null,
      };
    case "RESET_ERROR":
      return {
        ...state,
        error: false,
        error_response: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        isFetching: false,
        error: true,
        error_response: action.payload.error_response,
      };
    case "LOG_OUT":
      return {
        ...state,
        user: null,
        isFetching: false,
        isLoggedIn: false,
        error: false,
        error_response: null,
      };
    case "ADD_FRIEND":
      if (
        !(action.payload in new Set(...state.user.user.followings)) &&
        !(action.payload in new Set(state.user.user.followers))
      ) {
        return {
          ...state,
          user: {
            ...state.user,
            user: {
              ...state.user.user,
              followings: [...state.user.user.followings, action.payload],
              followers: [...state.user.user.followers, action.payload],
            },
          },
        };
      }

    case "UPDATE_FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          user: {
            ...state.user.user,
            followings: [...state.user.user.followings, action.payload],
          },
        },
      };
    case "UPDATE_UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          user: {
            ...state.user.user,
            followings: state.user.user.followings.filter(
              (following) => following !== action.payload
            ),
          },
        },
      };
    default:
      return state;
  }
};

export default AuthReducer;
