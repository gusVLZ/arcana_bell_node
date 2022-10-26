const express = require("express");
const cDoor = require("../controller/door");
const user = require("../controller/user");
const notification = require("../controller/notification");

const router = express.Router();

//Auth
router.post("/login", user.login) 
router.post("/cadastrar", user.cadastrar)
router.post("/notification/send", notification.send)

//Ações
router.get("/openDoor/:username", cDoor.openDoor);
router.get("/log", cDoor.logTabela);
router.post("/logging", cDoor.logging);

module.exports = router;