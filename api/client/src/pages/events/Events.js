import { useContext, useState, useEffect } from "react";
import { PlayCircle } from '@mui/icons-material';
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import { isEmpty } from "../../utils/utils";
import Loading from "../Loading";
import { fetchEvents } from "../../services/user.service";
import "./events.css";
import EventCard from "./EventCard"; 
import axiosInstance from "../../config/config";
import env_config from '../../config/index';

const Events = () => {
  const user = useContext(AuthContext).user.user;
  const [eventsRes, setEventsRes] = useState([]);
  useEffect(async () => {
    try {
      const response = await fetchEvents();
      setEventsRes(response.data._embedded.events);
    } catch (error) {
      console.log(error)
    }
   
  }, []);

  const Events = ({ results }) => {
    return (
      <div className="eventsPageFeed">
        <div className="eventsPagFeedWrapper">
          <h2 className="eventsPageHeader" >Events</h2>
          <div className="eventsContent">
          {results.map((i, idx) => {
            return <EventCard key={idx} item={i} />;
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
          <div className="eventsPageContainer">
            <Sidebar />
            {eventsRes ? <Events results={eventsRes} /> : <Loading/>}
            <Rightbar currentUser={user} />
          </div>
        </>
      )}
    </>
  );
};

export default Events;
