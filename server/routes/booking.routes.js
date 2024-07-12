const express = require("express");
const router = express.Router();
const { authenticate } = require("../auth/authenticate");
const {
  createBooking,
  getBookingsByStudent,
  cancelBooking,
} = require("../controllers/booking.controller");

// Create a Booking
router.post("/create-checkout-session/:id", authenticate, createBooking);


// Get bookings by student
router.get("/:id", authenticate, getBookingsByStudent);

// Cancel a booking
router.put("/cancel-booking/:id", authenticate, cancelBooking);

module.exports = router;
