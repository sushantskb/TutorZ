const express = require("express");
const router = express.Router();
const { authenticate } = require("../auth/authenticate");
const {
  getUsers,
  updateProfile,
  deleteProfile,
  addTutor,
  removeTutor,
  approveTutorRequest,
  assignedUsers,
} = require("../controllers/user.controller");


// Profiles
router.get("/", authenticate, getUsers);
router.get("/assigned-users/:id", authenticate, assignedUsers);
router.put("/profile/me", authenticate, updateProfile);
router.delete("/profile/me", authenticate, deleteProfile);

// Functionalities
router.post("/add-tutor/:id",authenticate, addTutor), // tutor id
router.post("/approve-tutor/:id", authenticate, approveTutorRequest); // student id
router.delete("/remove-tutor/:id",authenticate, removeTutor); // target id (student or tutor)

module.exports = router;
