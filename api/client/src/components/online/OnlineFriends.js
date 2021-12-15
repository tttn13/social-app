import "./online.css"

import Online from "./Online";

const OnlineFriends = ({ friends }) => {
    return (
        <>
        <h4 className="rightbarTitle">Online Friends </h4>
        <ul className="rightbarFriendList">
          {friends.length > 0 && friends.map((friend) => (
            <Online key={friend._id} user={friend} />
          ))}
        </ul>
        </>
    )
}

export default OnlineFriends