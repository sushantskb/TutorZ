const mongoose = require("mongoose");

const URI = process.env.MONGO_URI;

const connDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to DB".green.bold);
  } catch (error) {
    console.log("Error occured".red.bold + error);
  }
};

module.exports = { connDB };
