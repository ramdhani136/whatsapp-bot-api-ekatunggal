const express = require("express");
const router = express.Router();
const menu = require("../controller/menuController");

router.post("/", menu.create);
router.get("/", menu.getAllMenu);
router.get("/:id", menu.getOneMenu);
router.put("/:id", menu.updateMenu);
router.delete("/:id", menu.deleteMenu);

module.exports = router;
