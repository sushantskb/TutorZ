const express = require("express");
const router = express.Router();
const { authenticate } = require("../auth/authenticate");

const {
  createSlot,
  getSlot,
  getASlot,
  updateSlot,
  deleteSlot,
} = require("../controllers/slot.controller");

// Create a Slot
router.post("/create-slots", authenticate, createSlot);

// Fetch Slots of a teacher
router.get("/", authenticate, getSlot);

// Delete a Slot
router.delete("/delete-slot/:id", authenticate, deleteSlot);

module.exports = router;
