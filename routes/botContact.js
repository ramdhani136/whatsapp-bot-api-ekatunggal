const express = require("express");
const router = express.Router();
const botContactController = require("../controller/botContactController");

router.post("/", botContactController.create);
router.get("/", botContactController.getAllBotContact);
router.get("/:id", botContactController.getOneBotContact);
router.put("/:id", botContactController.updateBotContact);
router.delete("/:id", botContactController.deleteBotContact);
router.delete("/bot/:id", botContactController.deleteAllByBot);

module.exports = router;
