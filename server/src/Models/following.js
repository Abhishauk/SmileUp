const mongoose = require("mongoose");

const FollowingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    followingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
   
  }
);

const Following = mongoose.model("Following", FollowingSchema);
module.exports = Following;
