import './register.css';

import { useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';

import { useErrorMessage } from '../../../components/customHooks/useErrorMessage';
import env_config from '../../../config';
import { loginUser, registerUser } from '../../../context/AsyncActions';
import { ResetError } from '../../../context/AuthActions';
import { AuthContext } from '../../../context/AuthContext';
import Footer from '../footer/Footer';

const Register = () => {
  const { demoUser } = env_config;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const password = useRef({});
  password.current = watch('password', '');
  const { isFetching, dispatch, error_response } = useContext(AuthContext);
  const { errorMessage } = useErrorMessage({ errorResponse: error_response });
  const history = useHistory();

  const onSubmit = async (data) => {
    const user = {
      username: data.username.toLowerCase().split(' ').join(''),
      email: data.email.toLowerCase(),
      password: data.password,
    };

    await registerUser({ user, dispatch, history });
  };

  const handleDemoAccount = async (e) => {
    e.preventDefault();
    await loginUser(demoUser, dispatch);
  };

  const handleLinkClick = () => {
    if (error_response) dispatch(ResetError());
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">MySocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on MySocial
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBoxRegister" onSubmit={handleSubmit(onSubmit)}>
            <input
              className={`loginInput ${errors?.username ? 'invalid' : ''}`}
              autoComplete="off"
              type="text"
              placeholder="Username"
              {...register('username', {
                required: 'username is required',
                pattern: {
                  value: /^[A-Za-z0-9][A-Za-z0-9_.]{2,9}$/i,
                  message:
                    'username is 3-10 characters, contains alphanumeric characters and _ or - ',
                },
              })}
            />
            <span className="error_msg"> {errors?.username?.message} </span>

            <input
              className={`loginInput ${errors?.email ? 'invalid' : ''}`}
              autoComplete="off"
              placeholder="Email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Email is invalid',
                },
              })}
            />
            <span className="error_msg"> {errors?.email?.message}</span>

            <input
              className={`loginInput ${errors?.password ? 'invalid' : ''}`}
              autoComplete="off"
              placeholder="Password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/i,
                  message:
                    'Password must have at least 6 characters, 1 uppercase, 1 lowercase letter and 1 number',
                },
              })}
            />
            <span className="error_msg"> {errors?.password?.message} </span>

            <input
              className={`loginInput ${
                errors?.repeatedPassword ? 'invalid' : ''
              }`}
              autoComplete="off"
              placeholder="Confirm password"
              type="password"
              {...register('repeatedPassword', {
                validate: (value) =>
                  value === password.current || 'The passwords do not match',
              })}
            />
            <span className="error_msg">
              {errors?.repeatedPassword?.message}
            </span>
            {errorMessage && <span className="error_msg">{errorMessage}</span>}

            <input className="loginButton" type="submit" value="Sign Up" />

            <Link to="/login" className="loginRegisterButtonLink">
              <button
                className="loginRegisterButton"
                disabled={isFetching}
                onClick={handleDemoAccount}
              >
                Log Into Demo Account
              </button>
            </Link>
            <Link
              to="/login"
              className="loginDemo"
              onClick={() => handleLinkClick()}
            >
              Already Signed Up? Log In
            </Link>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
