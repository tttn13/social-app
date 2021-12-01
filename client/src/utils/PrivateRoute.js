import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";

const PrivateRoute = ({ children, ...rest }) => {
  const { user, isFetching } = useContext(AuthContext);
  if (isFetching) {
    return <Loading />;
  }
  console.log("this is private route")
  return <Route {...rest}>{!user ? <Redirect to="/login" /> : children}</Route>;
};



export default PrivateRoute;
