import "./friendRequests.css";

import { useContext, useEffect, useState } from "react";

import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import { getAllUsers } from "../../services/user.service";
import { isEmpty, countMutualFriends } from "../../utils/utils";
import Loading from "../Loading";
import RequestCard from "./RequestCard";

const FriendRequests = () => {
  const user = useContext(AuthContext).user.user;
  const [reqRes, setReqRes] = useState([]);

  const getPotentialFriends = async (allUsers, currUser) => {
    let currUserFollowersIds = new Set(currUser.followers);
    let currUserFollowingsIds = new Set(currUser.followings);
    
    let allUsersIds = allUsers.map((i) => {
      if (!currUserFollowersIds.has(i) && !currUserFollowingsIds.has(i) && !user.followings.includes(user._id) && !user.followers.includes(user._id)) {
        return i._id;
      }
    });
    const potentialIds = new Set(allUsersIds);
    const res = [];
    for (const u of allUsers) {
      if (potentialIds.has(u._id)) {
        const mutualCount = countMutualFriends(u, user);
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
      const potentials = await getPotentialFriends(res.data, user);
      setReqRes(potentials);
    } catch (error) {
      console.log(error);
    }
  }, [user?.followings]);

  const Requests = ({ results }) => {
    return (
      <div className="reqPageFeed">
        <div className="reqPageFeedWrapper">
          <h2 className="reqPagePageHeader" style={{ paddingBottom: "20px" }}>
            Friend Requests
          </h2>
          <div className="reqContent ">
            {results.map((person, idx) => {
              if (person.user._id !== user._id) {
                return (
                  <RequestCard
                    key={idx}
                    user={user}
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
      {!isEmpty(user) && (
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
