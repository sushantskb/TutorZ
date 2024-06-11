const Booking = require("../models/booking.model");
const Slot = require("../models/slot.model");

// Create a Booking
exports.createBooking = async (req, res) => {
  try {
    const slotId = req.params.id;
    const studentId = req.user._id;

    const slot = await Slot.findById(slotId);

    if (!slot) {
      return res
        .status(404)
        .json({ success: false, message: "Slot Not Found" });
    }

    const bookingCount = await Booking.countDocuments({ slotId });
    if (bookingCount >= slot.capacity) {
      return res
        .status(400)
        .json({ success: false, message: "Slot is fully booked" });
    }

    const booked = await Booking.findOne({ studentId });
    if (booked && booked.status) {
      return res
        .status(200)
        .json({ success: false, message: "You have already booked this" });
    }

    const booking = new Booking({
      studentId,
      slotId,
      startTime: slot.startTime,
      endTime: slot.endTime,
      duration: slot.duration,
    });

    booking.status = true;

    await booking.save();
    return res.status(201).json({ success: true, booking });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Get bookings by student
exports.getBookingsByStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const bookings = await Booking.find({ studentId, status: true }).populate(
      "slotId"
    );
    return res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not Found" });
    }

    booking.status = false;
    await booking.save();

    return res
      .status(200)
      .json({ success: true, message: "Successfully Cancelled" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
