const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    price:{
      type:String,
      default:"Free"
    }
  },
  { timestamps: true }
);

const Slot = mongoose.model("Slot", slotSchema);

module.exports = Slot;
