const express = require("express");
const router = express.Router();
const session = require("../controller/session.controller");

router.post("/", session.create);
router.get("/", session.getAllSessions);
router.get("/:id", session.getOneSession);
router.put("/:id", session.updateSession);
// router.delete("/:id", session.deleteSession);

module.exports = router;
