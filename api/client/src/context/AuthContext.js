import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import { isEmpty } from "../utils/utils";
import { getUserFromStorage } from "../services/token.service";
import { checkToken } from "../services/auth.service";
import history from "../utils/history";

let userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const INITIAL_STATE = {
  user: userFromStorage,
  isLoggedIn: false,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    const checkUser = async () => {
      if (!getUserFromStorage()) {
        history.push("/")
        if (state.user !== null && !isEmpty(state.user) && state.isLoggedIn) {
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      } else {
        await checkToken({ dispatch, history });
      }
    };

    checkUser();

    return () => {
      console.log("clean up in auth context");
    };
  }, [state.user, state.isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
