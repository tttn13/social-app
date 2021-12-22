import './loginBox.css';

import { CircularProgress } from '@mui/material';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import env_config from '../../config/index';
import { loginUser } from '../../context/AsyncActions';
import { ResetError } from '../../context/AuthActions';
import { AuthContext } from '../../context/AuthContext';
import { useErrorMessage } from '../customHooks/useErrorMessage';

const LoginBox = () => {
  const { demoUser } = env_config;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isFetching, dispatch, error_response } = useContext(AuthContext);
  const { errorMessage } = useErrorMessage({ errorResponse: error_response });

  const handleClick = async (e) => {
    e.preventDefault();
    let payload = { email, password };
    await loginUser(payload, dispatch);
  };

  const handleDemoAccount = async (e) => {
    e.preventDefault();
    await loginUser(demoUser, dispatch);
  };

  const handleLinkClick = () => {
    if (error_response) dispatch(ResetError());
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
      {errorMessage && <span className="error_msg">{errorMessage}</span>}

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

      <Link
        to="/register"
        className="loginRegisterButtonLink"
        onClick={() => handleLinkClick()}
      >
        <button className="loginRegisterButton">
          {isFetching ? <CircularProgress size="20px" /> : 'Create New Account'}
        </button>
      </Link>
    </form>
  );
};

export default LoginBox;
