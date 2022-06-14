import "./news.css";

import { useCallback,useContext, useEffect, useState } from "react";

import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import { fetchNews } from "../../services/user.service";
import { isEmpty } from "../../utils/utils";
import Loading from "../Loading";
import NewsCard from "./NewsCard";

const News = () => {
  const user = useContext(AuthContext).user.user;
  const [newsRes, setNewsRes] = useState([]);

  const getRssFeed = useCallback(async () => {
    try {
      const res = await fetchNews();
      setNewsRes(res.data);
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    getRssFeed();
    const interval = setInterval(() => {
      getRssFeed();
    }, 3600000 * 24);
    return () => clearInterval(interval);
  }, []);

  const getToday = () => {
    const d = new Date().toString().split(" ").splice(1, 3);
    return d[0] + " " + d[1] + ", " + d[2];
  };
  const NewsRes = ({ results }) => {
    return (
      <div className="newsFeed">
        <div className="newsHeaderWrapper">
          <h2 className="newsHeader">News</h2>
          <div style={{ color: "#a1a3a7" }}> Today is {getToday()}</div>
        </div>

        <div className="newsContent">
          {results.map((i, idx) => {
            return <NewsCard key={idx} item={i} />;
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      {!isEmpty(user) && (
        <>
          <Topbar />
          <div className="newsPageContainer">
            <Sidebar />
            {newsRes ? <NewsRes results={newsRes} /> : <Loading />}
            <Rightbar currentUser={user} />
          </div>
        </>
      )}
    </>
  );
};

export default News;
