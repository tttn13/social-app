import { CircularProgress } from '@mui/material';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import env_config from '../../config/index';
import { loginUser } from '../../context/AsyncActions';
import { AuthContext } from '../../context/AuthContext';

const LoginBox = () => {
  const { demoUser } = env_config;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    let payload = { email, password };
    await loginUser(payload, dispatch);
  };

  const handleDemoAccount = async (e) => {
    e.preventDefault();
    await loginUser(demoUser, dispatch);
  };

  return (
    <form className="loginBox">
      <input
        placeholder="Email"
        type="email"
        className="loginInput"
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <input
        placeholder="Password"
        type="password"
        className="loginInput"
        onChange={(e) => setPassword(e.target.value)}
        minLength={6}
        required
        autoComplete="new-password"
      />
      <button
        className="loginButton"
        disabled={isFetching}
        onClick={handleClick}
      >
        {isFetching ? <CircularProgress size="20px" /> : 'Log In'}
      </button>
      <button
        className="loginDemoButton"
        disabled={isFetching}
        onClick={handleDemoAccount}
      >
        {isFetching ? (
          <CircularProgress size="20px" />
        ) : (
          'Log Into Demo Account'
        )}
      </button>

      <Link to="/register" className="loginRegisterButtonLink">
        <button className="loginRegisterButton">
          {isFetching ? <CircularProgress size="20px" /> : 'Create New Account'}
        </button>
      </Link>
    </form>
  );
};

export default LoginBox;
