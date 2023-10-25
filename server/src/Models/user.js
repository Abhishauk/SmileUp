const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    UserName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    Name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    Email: {
      type: String,
      required: true,
      max: 50,
    },
    Phone:{
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
      min: 5,
    },
    block:{
      type:Boolean
      
    },
    DOB: {
      type:Date
    },
    profileImage:{
      type:String,
    },
    following:{
      type:String,
      default:0
    },
    follower:{
      type:String,
      default:0
    },
    posts:{
      type:String,
      default:0
    },
   
 
  },

  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
