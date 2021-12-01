import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import { isEmpty } from "../utils/utils";
import { logoutUser } from "./AsyncActions";
import { getUserFromStorage } from "../services/token.service";

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
    if (!getUserFromStorage()) { 
      if (state.user !== null && !isEmpty(state.user) && state.isLoggedIn) {
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    } 
    else {
      if (!state.isLoggedIn || state.user == null || isEmpty(state.user)) {
        console.log("logout because page on load");
        logoutUser(dispatch);
      }
    }
    return () => {
      console.log("clean up in auth context");
      logoutUser(dispatch);
    }
  }, []);



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
