import { useContext, useState, useEffect } from "react";
import { PlayCircle } from '@mui/icons-material';
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import { isEmpty } from "../../utils/utils";
import Loading from "../Loading";
import { fetchVids } from "../../services/user.service";
import "./videos.css";

const Videos = () => {
  const user = useContext(AuthContext).user.user;
  const [videosRes, setVideosRes] = useState([]);
  const youtubeUrl = "https://www.youtube.com/watch?v=";
  useEffect(async () => {
    const res = await fetchVids();
    setVideosRes(res.data.items);
  }, []);

  const VideosRes = ({ results }) => {
    return (
      <div className="videoFeed">
        <div className="videoFeedWrapper">
          <h2 className="videoHeader" >Videos</h2>
          <div className="content">
            {results.map((i, idx) => {
              if (i.snippet) {
                return (
                  <a
                    key={idx}
                    className="videoContainer"
                    href={youtubeUrl + i.id.videoId}
                    role="button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="imgContainer">
                      <img
                        className="thumbnail"
                        src={i.snippet.thumbnails?.high?.url}
                      />
                      
                      <div className="middle">
                        <PlayCircle fontSize="large" color="error"/>
                      </div>
                    </div>
                    <h3> {i.snippet.title} </h3>
                  </a>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {!isEmpty(user) && (
        <>
          <Topbar />
          <div className="videoPageContainer">
            <Sidebar />
            {videosRes ? <VideosRes results={videosRes} /> : <Loading/>}
            <Rightbar currentUser={user} />
          </div>
        </>
      )}
    </>
  );
};

export default Videos;
