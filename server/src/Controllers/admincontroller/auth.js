const User = require("../../Models/user.js")
module.exports = {  

   adminLogin : async (req, res) => {
    console.log("sdfsdf");
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
    console.log("yyyyyy");
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
      console.log("qqqqqqqq",userId);
      const user = await User.findOne({ _id: userId });
      console.log(user);
     if(user.block == true) {
           user.block = false;
           user.save()
           return res.status(200).json("blocked");
           
     } else {
           user.block = true
           user.save()
           return res.status(200).json("unblocked")
     }
       
    } catch (error) {
      res.status(500).json({ error: err.message });
    }

  }
}