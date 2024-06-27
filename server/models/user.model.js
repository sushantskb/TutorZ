const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "tutor"],
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: String,
    phone: String,
    class: String, // For Student
    subject: String, // For tutors
    qualification: String, // For tutors
    experience: String, // For tutors
    timeSlots: String, // For tutors
    classesPerWeek: Number, // For tutor
    fees: Number, // For tutor
    profileImage: String,
    tutors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    pendingRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
