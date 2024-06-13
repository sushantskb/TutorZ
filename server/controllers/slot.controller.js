const Slot = require("../models/slot.model");
const { parse, format } = require("date-fns");

// Helper function to parse time string
const parseTimeString = (timeString, referenceDate) => {
  const [hours, minutes = "0", period] = timeString
    .match(/(\d+):?(\d+)?\s*(a.m.|p.m.)/i)
    .slice(1);
  let hours24 = parseInt(hours);
  if (period.toLowerCase() === "p.m." && hours !== "12") hours24 += 12;
  if (period.toLowerCase() === "a.m." && hours === "12") hours24 = 0;
  return new Date(referenceDate.setHours(hours24, minutes, 0, 0));
};

// Helper function to format time
const formatTime = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "p.m." : "a.m.";
  const hours12 = hours % 12 || 12; // Convert 0 to 12 for 12 a.m.
  const minutesStr =
    minutes === 0 ? "" : `:${String(minutes).padStart(2, "0")}`;
  return `${hours12}${minutesStr} ${ampm}`;
};

// Create a Slot
exports.createSlot = async (req, res) => {
  try {
    const { date, startTime, endTime, capacity, duration } = req.body;
    const teacherId = req.user._id;

    // Parse the date and time strings
    const parsedDate = parse(date, "yyyy-MM-dd", new Date());
    const startTimeParsed = parseTimeString(startTime, new Date(parsedDate));
    const endTimeParsed = parseTimeString(endTime, new Date(parsedDate));

    const slot = new Slot({
      teacherId,
      date: parsedDate,
      startTime: startTimeParsed,
      endTime: endTimeParsed,
      capacity,
      duration,
    });

    await slot.save();

    return res.status(201).json({
      success: true,
      slot: {
        date: format(parsedDate, "yyyy-MM-dd"),
        startTime: formatTime(startTimeParsed),
        endTime: formatTime(endTimeParsed),
        capacity,
        duration,
      },
    });
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

    const formattedSlots = slots.map((slot) => ({
      date: format(slot.date, "yyyy-MM-dd"),
      startTime: formatTime(slot.startTime),
      endTime: formatTime(slot.endTime),
      capacity: slot.capacity,
      duration: slot.duration,
    }));

    return res.status(200).json({ success: true, slots: formattedSlots });
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

    if (!slot) {
      return res
        .status(404)
        .json({ success: false, message: "Slot not Found" });
    }

    const formattedSlot = {
      date: format(slot.date, "yyyy-MM-dd"),
      startTime: formatTime(slot.startTime),
      endTime: formatTime(slot.endTime),
      capacity: slot.capacity,
      duration: slot.duration,
    };

    return res.status(200).json({ success: true, slot: formattedSlot });
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

    // Parse the date and time strings
    const parsedDate = parse(date, "yyyy-MM-dd", new Date());
    const startTimeParsed = parseTimeString(startTime, new Date(parsedDate));
    const endTimeParsed = parseTimeString(endTime, new Date(parsedDate));

    const slot = await Slot.findOneAndUpdate(
      { _id: slotId, teacherId },
      {
        date: parsedDate,
        startTime: startTimeParsed,
        endTime: endTimeParsed,
        capacity,
        duration,
      },
      { new: true }
    );

    if (!slot) {
      return res
        .status(404)
        .json({ success: false, message: "Slot not Found" });
    }

    const formattedSlot = {
      date: format(slot.date, "yyyy-MM-dd"),
      startTime: formatTime(slot.startTime),
      endTime: formatTime(slot.endTime),
      capacity: slot.capacity,
      duration: slot.duration,
    };

    return res.status(200).json({ success: true, slot: formattedSlot });
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
