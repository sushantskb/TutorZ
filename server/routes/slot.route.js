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
router.post("/slots", authenticate, createSlot);

// Fetch Slots of a teacher
router.get("/slots", authenticate, getSlot);

// Fetch a Slot
router.get("/slots/:id", authenticate, getASlot);

// Update a Slot
router.put("/slots/:id", authenticate, updateSlot);

// Delete a Slot
router.delete("/slots/:id", authenticate, deleteSlot);

module.exports = router;
