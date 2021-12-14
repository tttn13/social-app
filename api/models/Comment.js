const { model, Schema } = require('mongoose');

const CommentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Post',
    },
    body: String,
    isEdited: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = model('Comment', CommentSchema);
