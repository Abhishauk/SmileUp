const express = require("express");
const usercontroller = require("../Controllers/usercontroller/auth.js");


const router = express.Router();

router.post("/Register", usercontroller.Register);
router.post("/Login", usercontroller.Login);


module.exports = router;

