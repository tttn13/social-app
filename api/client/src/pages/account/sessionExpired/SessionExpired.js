import "./sessionExpired.css";
import "../login/login.css";

import { Link } from "react-router-dom";

import LoginBox from "../../../components/loginBox/LoginBox";

const SessionExpired = () => {

  return (
    <>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">MySocial</span>{" "}
          </Link>
        </div>

        <div className="topbarCenter"></div>
        <div className="topbarRight">
          
        </div>
      </div>

      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">Session Expired </h3>
          </div>
          <div className="loginRight">
            <LoginBox />
          </div>
        </div>
      </div>
    </>
  );
};

export default SessionExpired;
