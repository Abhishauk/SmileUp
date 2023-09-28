const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
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
      type:String,
      
    }
 
  },

  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
