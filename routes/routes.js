const express = require("express");
const notification = require("../controller/notification");

const router = express.Router();

//Auth
router.post("/notification/send", notification.send)

module.exports = router;