const express = require("express");
const router = express.Router();
const users = require("../controller/userController");
const { verifyToken } = require("../middleware/VerifiyToken");

router.post("/", users.register);
router.get("/", verifyToken, users.getUsers);
router.post("/login", users.login);
router.get("/token", users.refreshToken);
router.delete("/logout", users.logout);

module.exports = router;
