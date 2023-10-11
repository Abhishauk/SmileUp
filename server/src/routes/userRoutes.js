const express = require("express");
const usercontroller = require("../Controllers/usercontroller/auth.js");
const upload =require("../../src/config/multer.js")


const router = express.Router();

router.post("/Register", usercontroller.Register);
router.post("/Login", usercontroller.Login);
router.post('/UserProfile', upload.single('profilePicture'), usercontroller.UserProfile);




module.exports = router;

