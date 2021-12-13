import { lazy, Suspense, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AuthVerify from "./utils/AuthVerify";
import history from "./utils/history";
import PrivateRoute from "./components/common/PrivateRoute";
import { CircularProgress } from "@mui/material";
import Loading from "./pages/Loading";

function App() {
  const store = useContext(AuthContext);
  const { user: userContext, isLoggedIn, isFetching } = store;
  const Home = lazy(() => import("./pages/home/Home"));
  const Login = lazy(() => import("./pages/account/login/Login"));
  const Register = lazy(() => import("./pages/account/register/Register"));
  const SessionExpired = lazy(() => import("./pages/account/sessionExpired/SessionExpired"));
  const Profile = lazy(() => import("./pages/profile/Profile"));
  const SearchResults = lazy(() => import("./pages/searchResult/SearchResults"));
  
  return (
    <Router>
      <Suspense
        fallback={ <Loading/>
          // <div>
          //   Loading...
          //   <CircularProgress color="success" />
          // </div>
        }
      >
        <AuthVerify history={history} store={store} />
        <Switch>
          <PrivateRoute
            exact
            path="/"
            userContext={userContext}
            component={Home}
          />
          <Route path="/login">
            {userContext ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/register">
            {userContext ? <Redirect to="/" /> : <Register />}
          </Route>
          <PrivateRoute
            path="/profile/:username"
            userContext={userContext}
            component={Profile}
          />
          <PrivateRoute
            path="/searchresults"
            userContext={userContext}
            component={SearchResults}
          />
          <Route path="/logout">
            {userContext ? <Redirect to="/" /> : <SessionExpired />}
          </Route>
          <Route path="/session_expired">
            {userContext ? <Redirect to="/" /> : <SessionExpired />}
          </Route>
          {!isLoggedIn && !isFetching && <Redirect to="/login" />}
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
