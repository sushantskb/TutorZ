const express = require("express");
const router = express.Router();
const { authenticate } = require("../auth/authenticate");
const {
  getUsers,
  updateProfile,
  deleteProfile,
} = require("../controllers/user.controller");

router.get("/", authenticate, getUsers);
router.put("/profile/me", authenticate, updateProfile);
router.delete("/profile/me", authenticate, deleteProfile);

module.exports = router;
