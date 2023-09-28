
const User = require("../../Models/user.js")
const bcrypt = require('bcrypt');
module.exports = {

  Register: async (req, res) => {
    try {
      console.log("lllllllllll", req.body);
      const { Name, Email, Phone, Password } = req.body;
     
      const abs = await User.find()
      console.log("mmmm", abs);

      const existUser = await User.findOne({ Email });
      console.log("ppppppppp", existUser);
      if (existUser) {
        return res.status(400).json({ msg: "Email already exists" });
      }

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(Password, salt);
      

      const newUser = new User({
        Name,
        Email,
        Password:passwordHash,
        Phone
      });
      const SaveUser = newUser.save()
      res.status(201).json({ msg: "User registered successfully", user: SaveUser });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }

  },

  Login: async (req,res) => {
    try {
      const {Email,Password} = req.body;
 
      const user = await User.findOne({ Email:Email })
     
      if(!user) {
        return res.status(400).json({ Login:false, msg: "user does not exist   "})
      }

      if(user.block) {
     
        return res.status(400).json({ Login:false, msg: "blocked "})
      } 

      const passMatch = await bcrypt.compare(Password , user.Password)
      if(!passMatch) {
        return res.status(400).json({ Login:false, msg: "Invalid credentials. "})
      }
      
      res.status(201).json({ msg: "User Login successfully",user:user});


      
    } catch (error) {
      
    }

  }
}