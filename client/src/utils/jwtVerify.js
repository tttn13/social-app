import React from "react";
import jwt_decode from "jwt-decode";
import { getUserFromStorage } from "../services/token.service";
import { withRouter } from "react-router-dom";

const parseJwt = (token) => {
  try {
    return jwt_decode(token);
  } catch (error) {
    return null;
  }
};
const AuthVerifyComponent = (props) => {
  props.history.listen(() => {
    const user = getUserFromStorage();
    if (user) {
      const decodedJwt = parseJwt(user.refreshToken);
      console.log("checking decoded jwt", decodedJwt.exp * 1000 < Date.now())
      if (decodedJwt.exp * 1000 < Date.now()) {
        console.log("props.history is", props.history)
        props.logOut();
      }
    }
  });
  return <div></div>;
};

export default withRouter(AuthVerifyComponent);
