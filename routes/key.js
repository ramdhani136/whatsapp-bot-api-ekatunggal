const express = require("express");
const router = express.Router();
const key = require("../controller/key.controller");

router.post("/", key.create);
router.get("/", key.getKeyUrlFiles);
router.get("/:id", key.getOneKey);
router.put("/:id", key.updateKey);
router.delete("/:id", key.deleteKey);
// router.get("/", key.getKeyUrlFiles);

module.exports = router;
