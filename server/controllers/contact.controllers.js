const Contact = require("../models/contact.model");

exports.sendMessage = async (req, res) => {
  try {
    const { firstName, lastName, ...rest } = req.body;
    const message = await Contact.create({
      firstName,
      lastName,
      ...rest,
    });
    res.status(200).json({ message });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Internal Server Error" });
  }
};
