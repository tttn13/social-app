import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/account/login/Login";
import Register from "./pages/account/register/Register";
import SessionExpired from "./pages/account/sessionExpired/SessionExpired";
import Profile from "./pages/profile/Profile";
import SearchResults from "./pages/searchResult/SearchResults";
import AuthVerify from "./utils/AuthVerify";
import history from "./utils/history";

function App() {
  const store = useContext(AuthContext);
  const { user: userContext, isLoggedIn, isFetching } = store;

  return (
    <Router>
      <AuthVerify history={history} store={store} />

      <Switch>       
        <Route exact path="/">
          {userContext ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {userContext ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
          {userContext ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/profile/:username">
          {userContext ? <Profile /> : <Redirect to="/login" />}
        </Route>
        <Route path="/searchresults">
          {userContext ? <SearchResults /> : <Redirect to="/login" />}
        </Route>
        <Route path="/logout">
          {userContext ? <Redirect to="/" /> : <SessionExpired />}
        </Route>
        <Route path="/session_expired">
          {userContext ? <Redirect to="/" /> : <SessionExpired />}
        </Route>
        {!isLoggedIn && !isFetching && <Redirect to="/login" />}
      </Switch>
    </Router>
  );
}

export default App;
