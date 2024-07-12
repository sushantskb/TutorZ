const Slot = require("../models/slot.model");

// Create a Slot
exports.createSlot = async (req, res) => {
  try {
    const { date, startTime, endTime, subject, capacity, duration, price } =
      req.body;
    const teacherId = req.user._id;

    const slot = new Slot({
      teacherId,
      date,
      startTime,
      endTime,
      subject,
      capacity,
      duration,
      price,
    });

    await slot.save();

    return res.status(201).json({
      success: true,
      slot,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Fetch Slots of a teacher
exports.getSlot = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    const slots = await Slot.find({ teacherId });

    return res.status(200).json({ success: true, slots });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a Slot
exports.deleteSlot = async (req, res) => {
  try {
    const teacherId = req.user._id;
    const slotId = req.params.id;

    await Slot.findOneAndDelete({ _id: slotId, teacherId });
    return res.status(200).json({ success: true, message: "Deletion Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
