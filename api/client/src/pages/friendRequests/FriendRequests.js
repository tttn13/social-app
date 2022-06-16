import "./friendRequests.css";

import { useContext, useEffect, useState } from "react";

import { useCountFriendRequest } from "../../components/customHooks/useCountFriendRequest";
import { useFetchUser } from "../../components/customHooks/useFetchUser";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import { getAllUsers } from "../../services/user.service";
import { isEmpty } from "../../utils/utils";
import Loading from "../Loading";
import RequestCard from "./RequestCard";

const FriendRequests = () => {
  const user = useContext(AuthContext).user.user;
  const { user: currUser } = useFetchUser({ userId: user._id });
  const { friendReqs } = useCountFriendRequest({ currUser: currUser })
  const [reqRes, setReqRes] = useState(friendReqs);

  const handleDelete = (personId) => {
    setReqRes(reqRes.filter((i) => i.user._id !== personId));
  };

  useEffect(() => {
    setReqRes(friendReqs)
  }, [friendReqs, currUser])

  const Requests = ({ results }) => {
    return (
      <div className="reqPageFeed">
        <div className="reqPageFeedWrapper">
          <h2 className="reqPagePageHeader" style={{ paddingBottom: "20px" }}>
            Friend Requests
          </h2>
          <div className="reqContent ">
            {results.map((person, idx) => {
              if (person.user._id !== currUser._id) {
                return (
                  <RequestCard
                    key={idx}
                    user={currUser}
                    person={person.user}
                    handleDelete={handleDelete}
                    mutualFriends={person.mutualFriends}
                  />
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
      {!isEmpty(currUser) && (
        <>
          <Topbar />
          <div className="reqPageContainer">
            <Sidebar />
            {reqRes ? <Requests results={reqRes} /> : <Loading />}
          </div>
        </>
      )}
    </>
  );
};

export default FriendRequests;
