const express = require("express");
const usercontroller = require("../Controllers/usercontroller/auth.js");
const upload =require("../config/multer.js")


const router = express.Router();

router.post("/Register", usercontroller.Register);
router.post("/Login", usercontroller.Login);
router.post('/UserProfile', upload.single('profilePicture'), usercontroller.UserProfile);
router.post('/CreatePost', upload.single('video'),usercontroller.createPost);
router.post('/Posts',usercontroller.GetPosts);
router.get('/Home',usercontroller.Home)
router.post("/SearchUser",usercontroller.SearchUser);
router.post("/SerachUserProfile",usercontroller.SerachUserProfile)
router.get("/getDatas",usercontroller.getDatas);
router.post("/Follower",usercontroller.followUser);
router.post("/changePass",usercontroller.changePass);



module.exports = router;

