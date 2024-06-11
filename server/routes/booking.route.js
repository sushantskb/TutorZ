const express = require("express");
const router = express.Router();
const { authenticate } = require("../auth/authenticate");
const {
  createBooking,
  getBookingsByStudent,
  cancelBooking,
} = require("../controllers/booking.controller");

// Create a Booking
router.post("/bookings/:id", authenticate, createBooking);

// Get bookings by student
router.get("/bookings/student/:id", authenticate, getBookingsByStudent);

// Cancel a booking
router.put("/bookings/cancel/:id", authenticate, cancelBooking);

module.exports = router;
