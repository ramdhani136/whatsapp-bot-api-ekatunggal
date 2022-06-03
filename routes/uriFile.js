const express = require("express");
const router = express.Router();
const uriFile = require("../controller/uriFile.controller");

router.post("/", uriFile.create);
router.get("/", uriFile.getAllUri);
router.get("/:id", uriFile.getOneUri);
router.put("/:id", uriFile.updateUri);
router.delete("/:id", uriFile.deleteUri);
router.delete("/bot/:id", uriFile.deleteAllByBot);

module.exports = router;
