const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  firstName: {
    type: String,
    requried: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Contact = mongoose.model("Contact", contactSchema)

module.exports = Contact;