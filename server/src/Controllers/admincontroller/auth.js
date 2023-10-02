const User = require("../../Models/user.js")
module.exports = {  

   adminLogin : async (req, res) => {
    try {
      console.log(req.body);
      const { Email, Password } = req.body;
      if (Email == "admin@gmail.com" && Password == "123456") {
        res.status(200).json({login:true, msg:"login successfully"  });
      }else{
        return res.status(400).json({ login: false, msg: "Invalid credentials. " });
      }  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  userList: async (req,res) =>{
    try {
      const users = await User.find()
      console.log(users);
      return res.status(200).json({users})
      
    } catch (error) {
      res.status(500).json({ error: err.message });
    }

  },
  blockunblock: async (req,res) =>{
    try {
      const userId = req.body.userId;
      const user = await User.findOne({ _id: userId });
      if(user.block 
        ) {
        user.block = false;
      }else {
        user.block = true;
      }
      user.save()
      const users =await User.find()
     
      res.status(201).json(users);
       
    } catch (error) {
      res.status(500).json({ error: err.message });
    }

  }
}