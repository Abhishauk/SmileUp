const express = require("express");
const { createChat,findUserChats,findChat} = require("../Controllers/usercontroller/chat");

const router = express.Router();

router.post("/create/createChat",createChat);
router.get("/create/findUserChats:userId",findUserChats);
router.get("/create/find/:firstId/:SecondId",findChat);

module.exports = router;