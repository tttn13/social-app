import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, userContext, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!userContext) {
          return <Redirect to="/login" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
