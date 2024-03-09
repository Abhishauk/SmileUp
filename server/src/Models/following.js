const mongoose = require("mongoose");

const FollowingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    followingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    // Other fields specific to following if needed
  }
);

const Following = mongoose.model("Following", FollowingSchema);
module.exports = Following;
