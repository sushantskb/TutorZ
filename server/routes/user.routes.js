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
  getTutor,
  fetchPendingRequests,
  checkTutor,
} = require("../controllers/user.controller");


// Profiles
router.get("/", authenticate, getUsers);
router.get("/tutor/:tutorId", authenticate, getTutor);
router.get("/assigned-users/:id", authenticate, assignedUsers);
router.put("/profile/me", authenticate, updateProfile);
router.delete("/profile/me", authenticate, deleteProfile);

// Functionalities
router.get("/pending-requests", authenticate, fetchPendingRequests);
router.get("/check-tutor/:tutorId", authenticate, checkTutor);
router.post("/add-tutor/:id",authenticate, addTutor), // tutor id
router.post("/approve-tutor/:id", authenticate, approveTutorRequest); // student id
router.delete("/remove-user/:id",authenticate, removeTutor); // target id (student or tutor)

module.exports = router;
