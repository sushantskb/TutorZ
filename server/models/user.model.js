const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
  age: Number,
  phone: String,
  class: String, // For Student
  subject: String, // For tutors
  qualification: String, // For tutors
  experience: String, // For tutors
  timeSlots: String, // For tutors
  classesPerWeek: Number, // For tutor
  fees: Number, // For tutor
  profileImage: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
