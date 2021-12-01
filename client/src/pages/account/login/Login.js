import "./login.css";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { loginUser } from "../../../context/AsyncActions";
import { CircularProgress } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    let payload = { email, password }
    await loginUser(
      payload,
      dispatch
    );
  };
  
  const handleDemoAccount = async (e) => {
    e.preventDefault();
    const demoUser = {
      email: "BettySmith@gmail.com",
      password: "123456"
    }
    await loginUser(
      demoUser,
      dispatch
    );
  }

  const handleForgotPasswod = (e) => {
    e.preventDefault();
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
              {isFetching ? <CircularProgress size="20px" /> : "Log In"}
            </button>
            <button 
            className="loginDemoButton" 
            disabled={isFetching} 
            onClick={handleDemoAccount}>
              {isFetching ? <CircularProgress size="20px" /> : "Log Into Demo Account"}
            </button>

            <span 
            className="loginForgot"
            onClick={handleForgotPasswod}
            >Forgot Password?
            </span>
            <Link to="/register" className="loginRegisterButtonLink">
              <button className="loginRegisterButton">
                {isFetching ? (
                  <CircularProgress size="20px" />
                ) : (
                  "Create New Account"
                )}
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
