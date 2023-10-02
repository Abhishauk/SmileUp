
const User = require("../../Models/user.js")
const bcrypt = require('bcrypt');
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
    console.log("77777777777777", req.file);
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      const { filename, originalname, size, mimetype } = req.file;


      return res.status(200).json({ message: 'File uploaded successfully', filename, originalname, size, mimetype });

    } catch (error) {
      console.error('Error handling file upload:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  }