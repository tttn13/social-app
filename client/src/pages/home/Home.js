import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import "./home.css";
import { isEmpty } from "../../utils/utils";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useGetFriends } from "../../components/customHooks/useGetFriends";

const Home = () => {
  const { user } = useContext(AuthContext).user;
  const { friends } = useGetFriends(user)
  
  return (
    <>      
      {!isEmpty(user) && friends && (
        <>
          <Topbar />
          <div className="homeContainer">
            <Sidebar currentUserFriends={friends}/>
            <Feed />
            <Rightbar currentUser={user} currentUserFriends={friends}/>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
