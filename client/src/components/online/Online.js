import "./online.css"
import { Link } from "react-router-dom";

const Online = ({ user }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER 

    return (
        <Link
              to={"/profile/" + user.username}
              style={{ color:"black", textDecoration: "none" }}
            > 
            <li className="rightbarFriend">
                
                <div className="rightbarProfileImgContainer">
                        <img
                        src={
                            user.profilePicture
                            ? PF + user.profilePicture
                            : PF + "person/noAvatar.png"
                        }
                        alt=""
                        className="rightbarProfileImg"
                        />
                    <span className="rightbarOnline"></span>
                </div>
            <span className="rightbarUsername">{user.username}</span>
        </li>
    </Link>
    )
}

export default Online
