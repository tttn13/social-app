import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import "./home.css";
import { isEmpty } from "../../utils/utils";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useFetchPosts } from "../../components/customHooks/useFetchPosts";

const Home = () => {
  const { user } = useContext(AuthContext).user;
  const { timeline } = useFetchPosts({currentUserId : user?._id})
  return (
    <>      
      {!isEmpty(user) && (
        <>
          <Topbar />
          <div className="homeContainer">
            <Sidebar />
            <Feed currentUser={user} posts ={timeline}/>
            <Rightbar currentUser={user}/>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
