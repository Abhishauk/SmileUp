const express = require("express");
const { createMessage,getMessages} = require("../Controllers/usercontroller/message");

const router = express.Router();

router.post("/message/createMessage",createMessage);
router.get("/message/getMessages:chatId",getMessages);


module.exports = router;