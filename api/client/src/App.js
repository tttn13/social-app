import { lazy, Suspense, useContext, useEffect } from 'react';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';

import PrivateRoute from './components/common/PrivateRoute';
import { AuthContext } from './context/AuthContext';
import Loading from './pages/Loading';
import AuthVerify from './utils/AuthVerify';
import history from './utils/history';

function App() {
  const store = useContext(AuthContext);
  const { user: userContext, isLoggedIn, isFetching } = store;
  const Home = lazy(() => import('./pages/home/Home'));
  const Login = lazy(() => import('./pages/account/login/Login'));
  const Register = lazy(() => import('./pages/account/register/Register'));
  const SessionExpired = lazy(() =>
    import('./pages/account/sessionExpired/SessionExpired')
  );
  const Profile = lazy(() => import('./pages/profile/Profile'));
  const SearchResults = lazy(() =>
    import('./pages/searchResult/SearchResults')
  );
  const Videos = lazy(() => import ('./pages/videos/Videos'))
  const News = lazy(() => import ('./pages/news/News'))
  const Events = lazy(() => import ('./pages/events/Events'))
  const FriendRequests = lazy(() => import ('./pages/friendRequests/FriendRequests'))

  return (
    <Router>
      <Suspense fallback={<Loading />}>
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
          <PrivateRoute
            path="/videos"
            userContext={userContext}
            component={Videos}
          />
          <PrivateRoute
            path="/news"
            userContext={userContext}
            component={News}
          />
          <PrivateRoute
            path="/events"
            userContext={userContext}
            component={Events}
          />
          <PrivateRoute
            path="/findfriends"
            userContext={userContext}
            component={FriendRequests}
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
