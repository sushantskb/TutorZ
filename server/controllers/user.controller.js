const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
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

exports.updateProfile = async (req, res) => {
  const { name, email, password, role, age, phone, profileImage, ...rest } =
    req.body;

  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;
    }
    if (age) user.age = age;
    if (phone) user.phone = phone;
    if (profileImage) user.profileImage = profileImage;

    // Update any additional fields
    Object.assign(user, rest);

    await user.save();

    const { password: _, ...updatedUser } = user._doc;
    return res.status(200).json({ message: "User updated", updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.deleteProfile = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User Deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};
