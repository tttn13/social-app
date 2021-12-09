import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getUserFromStorage } from "../services/token.service";

const PrivateRoute = ({component: Component, ...rest}) => {
  const userContext = getUserFromStorage()
 
  return (
    <Route 
      {...rest}
      render={(props) =>
        userContext 
        ? <Component {...props} /> 
        : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
