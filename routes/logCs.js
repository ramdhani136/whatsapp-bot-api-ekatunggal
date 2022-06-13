const express = require("express");
const router = express.Router();
const logs = require("../controller/logCsController");

router.post("/", logs.create);
router.get("/", logs.getAllLog);
router.get("/:id", logs.getOneLog);
router.put("/:id", logs.updateLog);
router.delete("/:id", logs.deleteLog);
router.get("/cust/:id", logs.getByCust);

module.exports = router;
