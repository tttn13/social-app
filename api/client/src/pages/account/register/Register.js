import "./register.css";
import { useRef, useContext } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { register } from "../../../services/auth.service"
import { loginUser } from "../../../context/AsyncActions";
import Footer from "../footer/Footer";

const Register = () => {
  const { isFetching, dispatch } = useContext(AuthContext);
  const username = useRef();
  const email = useRef();
  const currentPassword = useRef();
  const confirmedPassword = useRef();
  const history = useHistory();
  const demoUser = {
    email: "mortysmith@gmail.com",
    password: "123456"
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (confirmedPassword.current.value !== currentPassword.current.value) {
      confirmedPassword.current.setCustomValidity("Passwords don't match! ");
    } else {
      const user = {
        username: username.current.value.toLowerCase().split(" ").join(""),
        email: email.current.value.toLowerCase(),
        password: currentPassword.current.value,
      };
      try {
        await register(user)
        history.push("/login");
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  const handleDemoAccount = (e) => {
    e.preventDefault();
    loginUser(
      demoUser,
      dispatch
    );
  }
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
          <form 
          className="loginBox" 
          >
            <input
              placeholder="Username"
              className="loginInput"
              ref={username}
              required
              autoComplete="username"
            />
            <input
              placeholder="Email"
              className="loginInput"
              type="email"
              ref={email}
              required
              autoComplete="email"
            />
            <input
              placeholder="Password "
              className="loginInput"
              type="password"
              ref={currentPassword}
              required
              minLength="6"
              autoComplete="new-password"
            />
            <input
              placeholder="Confirm Password"
              className="loginInput"
              type="password"
              ref={confirmedPassword}
              required
              autoComplete="new-password"
            />
            <button 
            className="loginButton" 
            type="submit"
            onClick={handleClick}
            >
              Sign Up
            </button>

            <Link to="/login" className="loginRegisterButtonLink">
              <button className="loginRegisterButton" 
              disabled={isFetching} 
              onClick={handleDemoAccount}>
                Log Into Demo Account
              </button>
            </Link>
            <Link to="/login" className="loginDemo">
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
