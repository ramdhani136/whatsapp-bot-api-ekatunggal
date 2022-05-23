const express = require("express");
const router = express.Router();
const botContactController = require("../controller/botContactController");

router.post("/", botContactController.create);
router.get("/", botContactController.getAllBotContact);
router.get("/:id", botContactController.getOneBotContact);
router.put("/:id", botContactController.updateBotContact);
router.delete("/:id", botContactController.deleteBotContact);

module.exports = router;
