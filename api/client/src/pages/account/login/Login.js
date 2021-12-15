import "./login.css";

import LoginBox from "../../../components/loginBox/LoginBox";
import Footer from "../footer/Footer";

const Login = () => {

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
          <LoginBox />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;
