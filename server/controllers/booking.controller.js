const Booking = require("../models/booking.model");
const Slot = require("../models/slot.model");
const User = require("../models/user.model");

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
        .status(409)
        .json({ success: false, message: "You have already booked this" });
    }

    const booking = new Booking({
      studentId,
      teacherId: slot.teacherId,
      slotId,
      subject: slot.subject,
      startTime: slot.startTime,
      endTime: slot.endTime,
      duration: slot.duration,
      date: slot.date,
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
    const bookings = await Booking.aggregate([
      {
        $match: {
          studentId,
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
          localField: "slotInfo.teachedId",
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
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
// exports.getBookingsByStudent = async (req, res) => {
//   try {
//     const studentId = req.params.id;
//     const bookings = await Booking.find({ studentId, status: true });

//     if (bookings.length === 0) {
//       return res.status(404).json({ success: false, message: "No bookings found for this student" });
//     }

//     // Extract teacherIds from bookings
//     const teacherIds = bookings.map(booking => booking.teacherId);

//     // Fetch teacher data for all unique teacherIds
//     const teachers = await User.find({ _id: { $in: teacherIds } });

//     // Map teacher data to each booking
//     const bookingsWithData = bookings.map(booking => {
//       const teacherData = teachers.find(teacher => teacher._id.equals(booking.teacherId));
//       return {
//         booking,
//         teacherData: teacherData ? teacherData : null // Handle case where teacherData not found
//       };
//     });

//     return res.status(200).json({ success: true, bookings: bookingsWithData });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, error: error.message });
//   }
// };

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
