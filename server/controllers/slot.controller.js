const Slot = require("../models/slot.model");

// Create a Slot
exports.createSlot = async (req, res) => {
  try {
    const { date, startTime, endTime, capacity, duration } = req.body;
    const teacherId = req.user._id;
    const slot = new Slot({
      teacherId,
      date,
      startTime,
      endTime,
      capacity,
      duration,
    });
    await slot.save();

    return res.status(201).json({ success: true, slot });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Fetch Slots of a teacher
exports.getSlot = async (req, res) => {
  try {
    const teacherId = req.user._id;
    let date = req.query.date ? new Date(req.query.date) : new Date();
    date.setHours(0, 0, 0, 0);

    const slots = await Slot.find({
      teacherId,
      date: { $gte: date, $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000) },
    });
    return res.status(200).json({ success: true, slots });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Fetch a Slot
exports.getASlot = async (req, res) => {
  try {
    const slotId = req.params.id;
    const teacherId = req.user._id;
    const slot = await Slot.findOne({ _id: slotId, teacherId });
    return res.status(200).json({ success: true, slot });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Update a Slot
exports.updateSlot = async (req, res) => {
  try {
    const { date, startTime, endTime, capacity, duration } = req.body;
    const teacherId = req.user._id;
    const slotId = req.params.id;

    const slot = await Slot.findOneAndUpdate(
      { _id: slotId, teacherId },
      { date, startTime, endTime, capacity, duration },
      { new: true }
    );

    if (!slot) {
      return res
        .status(404)
        .json({ success: false, message: "Slot not Found" });
    }

    return res.status(200).json({ success: true, slot });
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
