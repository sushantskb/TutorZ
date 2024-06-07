const express = require("express");
const router = express.Router();
const { authenticate } = require("../auth/authenticate");
const { getUsers, updateProfile } = require("../controllers/user.controller");

router.get("/", authenticate, getUsers);
router.put("/profile/me", authenticate, updateProfile)

module.exports = router;
