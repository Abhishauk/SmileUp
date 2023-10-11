
const User = require("../../Models/user.js")
const bcrypt = require('bcrypt');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const dotenv = require("dotenv");
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

      res.status(201).json({ msg: "User Login successfully", user: user });



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
      console.log(existingUser);

      return res.status(200).json({
        message: 'Profile picture uploaded successfully',
        imageUrl: result.secure_url,
      });
    } catch (error) {
      console.error('Error handling profile picture upload:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

}




