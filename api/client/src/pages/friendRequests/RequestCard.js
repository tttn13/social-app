import DoneIcon from "@mui/icons-material/Done";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { handleAddFriend } from "../../context/AsyncActions";
import { AuthContext } from "../../context/AuthContext";

const RequestCard = ({ person, handleDelete, mutualFriends, user }) => {
  const { dispatch } = useContext(AuthContext);
  const [friended, setFriended] = useState(
    user.followings.includes(person._id) &&
    person.followers.includes(user._id)
  );

  const handleConfirm = async (personId) => {
    await handleAddFriend({
      currentUserId: user._id,
      selectedUserId: personId,
      dispatch,
    });
    setFriended(true);
  };

  return (
    <>
      {!friended && (
        <Card sx={{ width: 250, borderRadius: 3, mr: 3, mb: 3 }}>
          <Link
            to={person?.username ? "/profile/" + person.username : "/"}
            style={{ textDecoration: "none", color: "black" }}
            key={person._id}
          >
            <CardMedia
              component="img"
              height="140"
              image={
                person?.profilePicture?.length > 0
                  ? person.profilePicture
                  : 'images/person/noAvatar.png'
              }
              alt="avatar"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {person?.username}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {mutualFriends} mutual friends
              </Typography>
            </CardContent>
          </Link>

          <CardActions
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Button
                sx={{ width: "100%", mb: 1 }}
                variant="contained"
                size="small"
                color="primary"
                onClick={() => handleConfirm(person._id)}
              >
                Confirm
              </Button>

              <Button
                sx={{ width: "100%" }}
                variant="outlined"
                size="small"
                color="primary"
                onClick={() => handleDelete(person._id)}
              >
                Delete
              </Button>
            </Box>
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default RequestCard;
