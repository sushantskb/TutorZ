const User = require("../models/user.model");

exports.getUsers = async (req, res) => {
  try {
    const userRole = req.user.role; // wrong reference given here

    let users;

    if (userRole === "student") {
      users = await User.find(
        { role: { $in: ["student", "tutor"] } },
        "-password"
      );
    } else if (userRole === "tutor") {
      users = await User.find({ role: "tutor" }, "-password");
    } else {
      return res.status(403).json({ message: "Access denied" }); // typo here
    }
    
    return res.status(200).json(users);
  } catch (error) {
    console.log("Error fetching the users: ", error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
};
