const router = require('express').Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');

// get comment
router.get('/:commentId', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// create comment on a post
router.post('/:id', async (req, res) => {
  try {
    // check for existing user
    const userCreator = await User.findById(req.body.userId);

    // check for existing post
    const post = await Post.findById(req.params.id);
    if (!post) throw Error('Post not found');

    const newComment = new Comment({
      postId: req.params.id,
      body: req.body.body,
      userId: req.body.userId,
    });

    // save comment and return response
    const savedComment = await newComment.save();
    if (!savedComment) throw Error('Something went wrong saving the comment');

    post.comments.push(savedComment._id);
    await post.save();

    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete a comment
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) throw Error('Comment not found');

    const post = await Post.findById(comment.postId);
    if (!post) throw Error('Post not found');

    if (
      comment.userId.toString() === req.body.userId
      || post.userId.toString() === req.body.userId
    ) {
      post.comments = post.comments.filter((commentId) => commentId.toString() !== req.params.id);
      await Comment.findById(req.params.id).deleteOne();
      await post.save();
      return res.status(200).json(comment);
    }
    throw Error('Action not allowed');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// update comment
router.put('/:id', async (req, res) => {
  try {
    // check for existing comment
    const comment = await Comment.findById(req.params.id);
    if (!comment) throw Error('Comment not found');

    if (String(comment.userId) === String(req.body.userId)) {
      comment.isEdited = true;
      comment.body = req.body.body;
      await comment.save();

      const editedComment = await Comment.findById(req.params.id);
      return res.status(200).json(editedComment);
    }
    res.status(403).json('You can update your Comment only');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
