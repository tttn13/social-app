import "./home.css";

import { useContext } from "react";

import { useFetchPosts } from "../../components/customHooks/useFetchPosts";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import { isEmpty } from "../../utils/utils";

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
