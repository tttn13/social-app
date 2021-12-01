import { useCallback, useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axiosJWT from "./services/axiosJWT";
import Home from "./pages/home/Home";
import Login from "./pages/account/login/Login";
import Register from "./pages/account/register/Register";
import Profile from "./pages/profile/Profile";
// import SearchResults from "./pages/searchResult/SearchResults";
// import PrivateRoute from "./utils/PrivateRoute"
import history from "./utils/history";
import setUpInterceptors from "./services/setUpInterceptors";
import AuthVerifyComponent from "./utils/jwtVerify";
import { logout } from "./services/auth.service";
import { LogOut } from "./context/AuthActions";
import { removeUserFromStorage } from "./services/token.service";
import { isEmpty } from "./utils/utils";

function App() {
  const store = useContext(AuthContext);
  const { user: userContext, isLoggedIn, isFetching, dispatch } = store;

  const logOutOnExpired = async () => {
    console.log("logOutOnExpired")
    try {
      await logout();
      dispatch(LogOut())
      removeUserFromStorage();
    } catch (error) {
      console.log("calling logging out api failed", { err: error });
    }
  }

  // const logOutOnExpired = useCallback(async () => {
  //   try {
  //     await logout();
  //     dispatch(LogOut());
  //     removeUserFromStorage();
  //   } catch (error) {
  //     console.log("calling logging out api failed", { err: error });
  //   }
  // }, [dispatch]);
  
  useEffect(() => {
    if (!isEmpty(userContext) && userContext != null) setUpInterceptors(axiosJWT, store);
    return () => console.log("clean up in app.js")
  }, [userContext, store]);

  return (
    <Router history={history}>
      <Switch>
        {/* <PrivateRoute exact path="/" component={Home} /> */}
        <Route exact path="/">
          {!userContext ? <Redirect to="/login" /> : <Home />}
        </Route>
        <Route path="/login">
          {userContext ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
          {userContext ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/profile/:username">
          {/* <Profile /> */}
          {userContext ? <Profile /> : <Redirect to="/login" />}
        </Route>

        {/* <PrivateRoute path="/searchresults" component={SearchResults} /> */}
        <Route path="/logout">
          <Login />
        </Route>
        {!isLoggedIn && !isFetching && <Redirect to="/login" />}
      </Switch>
      <AuthVerifyComponent logOut={logOutOnExpired} />
    </Router>
  );
}

export default App;
