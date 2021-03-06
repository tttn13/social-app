const router = require("express").Router();
const User = require("../models/User");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
require("dotenv").config();
//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("account has been updated");
    } catch (error) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account ");
  }
});

//get user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const userFriends = await Promise.all(
      user.friends.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    userFriends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get friend requests
router.get("/:userId/friendRequest", async (req, res) => {
  try {
    const allUsers = await User.find();
    const currUser = await User.findById(req.params.userId);
    const userFriends = await Promise.all(
      currUser.friends.map((friendId) => {
        return User.findById(friendId);
      })
    );

    let currUserFriendsIds = new Set(userFriends.map((i) => i._id.toString()));
    let ans = [];
    for (const u of allUsers) {
      if (!currUserFriendsIds.has(u._id.toString()) && u._id.toString() !== req.params.userId) {
        const mutualCount = [...new Set([...u.friends, ...userFriends])].length;
          ans.push({ user: u, mutualFriends: mutualCount });
      }
    }

    res.status(200).json(ans);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//follow user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const userToFollow = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!userToFollow.followers.includes(req.body.userId)) {
        await userToFollow.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { friends: req.params.id } });
        res.status(200).json(`You are following ${userToFollow.username}`);
      } else {
        await userToFollow.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { friends: req.params.id } });
        res.status(200).json("user has been unfollowed");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can't follow yourself");
  }
});

//unfollow user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { friends: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("You don't follow this user");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can't unfollow yourself");
  }
});
//add friend
router.put("/:id/addfriend", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const newFriend = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      console.log(newFriend, currentUser);
      if (!currentUser?.friends.includes(req.params.id)) {
        await currentUser.updateOne({
          $push: { friends: newFriend._id.toString() },
        });
      }
      if (!newFriend?.friends.includes(req.body.userId)) {
        await newFriend.updateOne({
          $push: { friends: currentUser._id.toString() },
        });
      }

      res.status(200).json(`You are friends with ${newFriend.username}`);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can't friend yourself");
  }
});

//unfriend
router.put("/:id/unfriend", async (req, res) => {
  console.log("unfriend route");
  if (req.body.userId !== req.params.id) {
    try {
      const friend = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (currentUser.friends.includes(req.params.id)) {
        await currentUser.updateOne({
          $pull: { friends: req.params.id.toString() },
        });
      }
      if (friend.friends.includes(req.body.userId)) {
        await friend.updateOne({
          $pull: { friends: req.body.userId.toString() },
        });
      }
      res.status(200).json(`You have unfriended ${friend.username}`);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can't friend yourself");
  }
});

//get all staff
router.get("/allstaff", async (req, res) => {
  const userId = req.query.userId;
  try {
    const allusers = await User.find();
    const staff = allusers.filter((s) =>
      s.email.includes(process.env.COMP_DOMAIN)
    );
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all users
router.get("/allusers", async (req, res) => {
  try {
    const allusers = await User.find();
    res.status(200).json(allusers);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
