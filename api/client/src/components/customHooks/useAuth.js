import { useState, useEffect, useCallback, useContext } from "react";
import { Redirect } from "react-router-dom";
import { logOutOnExpired } from "../../context/AsyncActions";
import { AuthContext } from "../../context/AuthContext";
import { accessTokenIsExpired } from "../../services/axiosJwtInterceptors";
import history from "../../utils/history";
import { pause } from "../../utils/utils";

export const useAuth = () => {
  const [isAuthed, setIsAuthed] = useState(null);
  const store = useContext(AuthContext);
  const { dispatch } = store;

  const out = useCallback(async () => {
    await pause(1000);
    await logOutOnExpired(dispatch);
    history.push("/session_expired");
  }, [dispatch]);

  const authenticate = useCallback(async () => {
    if (accessTokenIsExpired()) {
      setIsAuthed(false)
      return false
    } else {
      setIsAuthed(true);
      return true;
    }
  }, []);

  useEffect(() => {
    authenticate();
    
    return () => setIsAuthed(null);
  }, [authenticate]);

  return {
    isAuthed,
    authenticate,
    out,
  };
};
