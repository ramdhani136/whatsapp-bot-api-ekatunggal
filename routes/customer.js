const express = require("express");
const router = express.Router();
const customer = require("../controller/customer.controller");
const { verifyToken } = require("../middleware/VerifiyToken");

router.post("/", customer.create);
router.get("/", verifyToken, customer.getAllCustomers);
router.get("/:id", customer.getOneCustomer);
router.put("/:id", customer.updateCustomer);
router.delete("/:id", customer.deleteCustomer);

module.exports = router;
