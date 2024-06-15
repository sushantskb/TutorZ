const express = require("express");
const router = express.Router();
const { authenticate } = require("../auth/authenticate");
const {
  getUsers,
  updateProfile,
  deleteProfile,
  addTutor,
  removeTutor,
} = require("../controllers/user.controller");


// Profiles
router.get("/", authenticate, getUsers);
router.put("/profile/me", authenticate, updateProfile);
router.delete("/profile/me", authenticate, deleteProfile);

// Functionalities
router.post("/add-tutor/:id",authenticate, addTutor), // tutor id
router.delete("/remove-tutor/:id",authenticate, removeTutor); // target id (student or tutor)

module.exports = router;
