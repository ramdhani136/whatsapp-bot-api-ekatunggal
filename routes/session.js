const express = require("express");
const router = express.Router();
const session = require("../controller/session.controller");

router.get("/", session.findAll);
router.post("/", session.create);

module.exports = router;
