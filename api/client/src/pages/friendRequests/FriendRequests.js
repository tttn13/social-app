import "./friendRequests.css";

import { useContext, useEffect, useState } from "react";

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
  const [reqRes, setReqRes] = useState([]);
  const { user: currUser } = useFetchUser({ userId: user._id });
  
  const getPotentialFriends = async (allUsers, currUser) => {
    let currUserFriendsIds = new Set(currUser.friends);
    let res = [];

    for (const u of allUsers) {
      if (!currUserFriendsIds.has(u._id)) {
        const mutualCount =  [...new Set([...u.friends, ...currUser.friends])].length;
        res.push({ user: u, mutualFriends: mutualCount });
      }
    }
    return res;
  };

  const handleDelete = (personId) => {
    setReqRes(reqRes.filter((i) => i.user._id !== personId));
  };
  
  useEffect(async () => {
    try {
      const res = await getAllUsers();
      if (!isEmpty(currUser)) {
        const potentials = await getPotentialFriends(res.data, currUser);
        setReqRes(potentials);
      }
    } catch (error) {
      console.log(error);
    }
  }, [currUser]);

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
