const express = require("express");
const router = express.Router();
const salesGroup = require("../controller/SalesGroupController");

router.post("/", salesGroup.create);
router.get("/", salesGroup.getAllSalesGroup);
router.get("/:id", salesGroup.getOneSalesGroup);
router.put("/:id", salesGroup.updateSalesGroup);
router.delete("/:id", salesGroup.deleteSalesGroup);

module.exports = router;
