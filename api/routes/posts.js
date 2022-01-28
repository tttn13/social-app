const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');
require('dotenv').config();
//@desc create a post
//@access Private
router.post('/', auth, async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});
//@desc update a post
//@access Private
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) throw Error('Comment not found');

    if (String(post.userId) === String(req.body.userId)) {
      await post.updateOne({ $set: req.body });

      const editedPost = await Post.findById(req.params.id);
      res.status(200).json(editedPost);
    } else {
      res.status(403).json('You can update your post only');
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//@desc delete a post
//@access Private
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      const comments = await Comment.deleteMany({ postId: { $eq: post._id } });
      res.status(200).json('Post is deleted');
    } else {
      res.status(403).json('You can delete your post only');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//@desc get timeline posts
//@access Private
router.get('/timeline/:userId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );

    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    res.status(500).json(error);
  }
});
//@desc like a post
//@access Public
router.put('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json('Post is liked');
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json('Post is disliked');
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//@desc get a post
//@access Public
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});
//@desc get an user's posts
//@access Public
router.get('/profile/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
