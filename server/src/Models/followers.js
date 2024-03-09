const mongoose = require("mongoose");

const FollowersSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    followerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    // Other fields specific to followers if needed
  }
);

const Followers = mongoose.model("Followers", FollowersSchema);
module.exports = Followers;
