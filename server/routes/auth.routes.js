const express = require("express");
const { signup, login, verifyToken } = require("../controllers/auth.controller");
const { authenticate } = require("../auth/authenticate");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify", authenticate, verifyToken);

module.exports = router;
