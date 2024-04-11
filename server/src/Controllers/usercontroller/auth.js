
const User = require("../../Models/user.js")
const Post = require("../../Models/post.js")
const Followers = require('../../Models/followers.js')
const bcrypt = require('bcrypt');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken")
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


dotenv.config();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});


module.exports = {

  Register: async (req, res) => {
    try {

      const { UserName, Name, Email, Phone, DOB, Password } = req.body;

      const abs = await User.find()

      const existUserName = await User.findOne({ UserName })

      if (existUserName) {
        return res.status(400).json({ msg: "Username already exists" })
      }
      const existUser = await User.findOne({ Email });

      if (existUser) {
        return res.status(400).json({ msg: "Email already exists" });
      }

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(Password, salt);


      const newUser = new User({
        UserName,
        Name,
        Email,
        Password: passwordHash,
        Phone,
        DOB
      });
      const SaveUser = newUser.save()
      res.status(201).json({ msg: "User registered successfully", user: SaveUser });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }

  },

  Login: async (req, res) => {
    try {
      const { UserName, Password } = req.body;

      const user = await User.findOne({ UserName: UserName })

      if (!user) {
        return res.status(400).json({ Login: false, msg: "user does not exist   " })
      }

      if (user.block) {
        return res.status(400).json({ msg: "blocked " })
      }

      const passMatch = await bcrypt.compare(Password, user.Password)
      if (!passMatch) {
        return res.status(400).json({ Login: false, msg: "Invalid credentials. " })
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.status(201).json({ msg: "User Login successfully", user: user, token: token });



    } catch (error) {

    }

  },


  UserProfile: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      const userId = req.body.userId;
      const existingUser = await User.findById(userId);

      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'images/',
      });

      existingUser.profileImage = result.secure_url;

      await existingUser.save();
      // console.log(existingUser);

      return res.status(200).json({
        message: 'Profile picture uploaded successfully',
        imageUrl: result.secure_url,
      });
    } catch (error) {
      console.error('Error handling profile picture upload:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },




  createPost: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No video uploaded' });
      }

      const userId = req.body.userId;

      const existingUser = await User.findById(userId);

      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'video',
        folder: 'videos/',
      });

      const newPost = new Post({
        userId: userId,
        videoUrl: result.secure_url,
      });

      await newPost.save();

      return res.status(200).json({
        message: 'Video uploaded successfully',
        videoUrl: result.secure_url,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  GetPosts: async (req, res) => {
    try {
      const userId = req.body.userId
      const posts = await Post.find({ userId: userId });
      return res.status(200).json({ posts })

    } catch (error) {
      res.status(500).json({ error: error.message });
    }


  },
  // Home: async  (req,res) => {
  //   try {
  //    const posts = await Post.find();
  //    console.log("ddddddddddd",posts);
  //    return res.status(200).json({posts})

  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // }
  Home: async (req, res) => {
    try {
      const postsDetails = await Post.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userDetails",
          },
        },
      ]);

      const formattedPosts = postsDetails.map((post) => {
        const postData = post;
        const userDetails = post.userDetails[0];
        const combinedData = {
          ...postData,
          userDetails,
        };
        return combinedData;
      })

      res.status(200).json({ posts: formattedPosts });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  SearchUser: async(req,res) => {
    try {
      let searchName = req.body.users;
      // console.log(searchName);
      const users = await User.find({ UserName: { $regex: new RegExp(`^${searchName}`, 'i') } });

      
      // console.log(users);   

      return res.status(200).json({users})
      
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  },
  SerachUserProfile: async(req , res) => {
     
      try {
        const { userId } = req.body;
   
        // Assuming User is a Mongoose model
        const userData = await User.findById(userId);
    
        return res.status(200).json({userData})
      } catch (error) {
        
      }
  },
  getDatas : async(req ,res) => {
 
    try {
      const datas =  await User.find();
      return res.status(200).json({datas})
      
    } catch (error) {
      
    }
  },
  followUser: async (req, res) => {
    try {
      const { userId, followerId } = req.body; // Assuming userId and followerId are sent in the request body
      console.log(":::::::::;",req.body);

      // Check if the follower entry already exists
      const existingFollower = await Followers.findOne({ userId, followerId });
      if (existingFollower) {
        return res.status(400).json({ error: "User is already followed" });
      }

      // Create a new follower entry
      const newFollower = new Followers({
        userId,
        followerId,
      });

      await newFollower.save();

      res.status(200).json({ message: "User followed successfully" });
    } catch (error) {
      console.error("Error following user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  
  }

}





