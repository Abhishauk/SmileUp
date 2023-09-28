const express = require("express");
const admincontroller = require("../Controllers/admincontroller/auth.js");


const router = express.Router();
router.post("/adminLogin", admincontroller.adminLogin);
router.get("/userList", admincontroller.userList);
router.post("/blockuser",admincontroller.blockunblock)


module.exports = router;
