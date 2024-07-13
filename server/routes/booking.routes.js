const express = require("express");
const router = express.Router();
const { authenticate } = require("../auth/authenticate");
const {
  createBooking,
  getBookingsByStudent,
  cancelBooking,
  getBookingsByTutor,
} = require("../controllers/booking.controller");

// Create a Booking
router.post("/create-checkout-session/:id", authenticate, createBooking);


// Get bookings by student and tutor
router.get("/:id", authenticate, getBookingsByStudent);
router.get("/", authenticate, getBookingsByTutor)

// Cancel a booking
router.put("/cancel-booking/:id", authenticate, cancelBooking);

module.exports = router;
