const express = require("express");
const router = express.Router();
const MessageControllers = require("../Controller/message.controller");

router.post("/createMessage", MessageControllers.createMessage);
router.get("/getAllMessages", MessageControllers.getAllMessages);   

module.exports = router;
