const express = require("express");
const router = express.Router();
const bot = require("../controller/bot.controller");

router.post("/", bot.create);
router.get("/", bot.getAllBots);
router.get("/:id", bot.getOneBot);
router.put("/:id", bot.updateBot);
router.delete("/:id", bot.deleteBot);

module.exports = router;
