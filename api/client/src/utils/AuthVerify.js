import React from "react";
import { withRouter } from "react-router-dom";

import { checkToken } from "../services/auth.service";
import { getUserFromStorage } from "../services/token.service";

const AuthVerify = ({ history, store }) => {
  const { dispatch } = store;

  history.listen(async () => {
    const user = getUserFromStorage();
    if (user) {
      console.log("checking token in AuthVerify component");
      await checkToken({ dispatch, history });
    }
  });
  return <div></div>;
};

export default withRouter(AuthVerify);
