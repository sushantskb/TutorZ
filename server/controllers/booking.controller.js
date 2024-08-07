const mongoose = require("mongoose");
const Booking = require("../models/booking.model");
const Slot = require("../models/slot.model");
const User = require("../models/user.model");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Create a Booking
exports.createBooking = async (req, res) => {
  try {
    const slotId = req.params.id;
    const studentId = req.user._id;
    const { customerDetails } = req.body;

    const slot = await Slot.findById(slotId).populate("teacherId");
    if (!slot) {
      return res.status(404).json({ success: false, message: "Slot Not Found" });
    }

    const tutor = slot.teacherId;
    if (!tutor) {
      return res.status(404).json({ success: false, message: "Tutor Not Found" });
    }

    const bookingCount = await Booking.countDocuments({ slotId });
    if (bookingCount >= slot.capacity) {
      return res.status(400).json({ success: false, message: "Slot is fully booked" });
    }

    const existingBooking = await Booking.findOne({ studentId, slotId });
    if (existingBooking) {
      return res.status(409).json({ success: false, message: "You have already booked this slot" });
    }

    // Create a Customer in Stripe
    const customer = await stripe.customers.create({
      name: customerDetails.name,
      address: {
        line1: customerDetails.address.line1,
        city: customerDetails.address.city,
        state: customerDetails.address.state,
        postal_code: customerDetails.address.postal_code,
        country: customerDetails.address.country,
      },
    });

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Demo Booking",
              images: [tutor.profileImage],
            },
            unit_amount: slot.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://tutorz.netlify.app/success", // Adjust according to your client-side success URL
      cancel_url: "https://tutorz.netlify.app/cancel", // Adjust according to your client-side cancel URL
      client_reference_id: slotId,
      metadata: {
        studentId: studentId.toString(),
        tutorId: tutor._id.toString(),
      },
      customer: customer.id,
    });

    return res.status(200).json({ success: true, sessionId: session.id });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Get bookings by student
exports.getBookingsByStudent = async (req, res) => {
  try {
    const bookings = await Booking.aggregate([
      {
        $match: {
          studentId: new mongoose.Types.ObjectId(req.params.id),
          status: true,
        },
      },
      {
        $lookup: {
          from: "slots",
          localField: "slotId",
          foreignField: "_id",
          as: "slotInfo",
        },
      },
      {
        $unwind: {
          path: "$slotInfo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "slotInfo.teacherId",
          foreignField: "_id",
          as: "teacherInfo",
        },
      },
      {
        $unwind: {
          path: "$teacherInfo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          slotId: 1,
          studentId: 1,
          status: 1,
          "slotInfo.teacherId": 1,
          "slotInfo.subject": 1,
          "teacherInfo.name": 1,
          "teacherInfo.profileImage": 1,
        },
      },
    ]);

    if (bookings.length == 0) {
      return res
        .status(404)
        .json({ success: false, message: "You haven't booked any slots." });
    }
    return res.status(200).json({ success: true, bookings });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};


exports.getBookingsByTutor = async (req, res) => {
  try {
    const teacherId = req.user._id;
    const bookings = await Booking.find({ teacherId, status: true });

    if (bookings.length === 0) {
      return res.status(404).json({ success: false, message: "No bookings found for this tutor" });
    }

    // Extract teacherIds from bookings
    const studentsId = bookings.map(booking => booking.studentId);

    // Fetch teacher data for all unique teacherIds
    const students = await User.find({ _id: { $in: studentsId } });

    // Map teacher data to each booking
    const bookingsWithData = bookings.map(booking => {
      const studentData = students.find(student => student._id.equals(booking.studentId));
      return {
        booking,
        studentData: studentData ? studentData : null // Handle case where teacherData not found
      };
    });

    return res.status(200).json({ success: true, bookings: bookingsWithData });
  } catch (error) {
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
    return res.status(500).json({ success: false, error: error.message });
  }
};
