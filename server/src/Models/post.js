const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
      },
      videoUrl: {
        type: String,
        required: true,
      },
  }
);
  

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
