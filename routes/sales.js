const express = require("express");
const router = express.Router();
const sales = require("../controller/SalesController");

router.post("/", sales.create);
router.get("/", sales.getAllSales);
router.get("/:id", sales.getOneSales);
router.put("/:id", sales.updateSales);
router.delete("/:id", sales.deleteSales);

module.exports = router;
