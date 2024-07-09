const express = require("express");
const router = express.Router();
const { authenticate } = require("../auth/authenticate");
const {
  createAssignment,
  getAssignments,
  getAssignmentsById,
  submitAssignment,
  updateAssignmentStatus,
} = require("../controllers/assignment.controller");

router.post("/create", authenticate, createAssignment);
router.get("/", authenticate, getAssignments);
router.get("/assignment/:id", authenticate, getAssignmentsById);
router.post("/submit/:id", authenticate, submitAssignment);
router.put("/status/:id", authenticate, updateAssignmentStatus);

module.exports = router;
