const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.signup = async (req, res) => {
  const { name, email, password, role, age, phone, profileImage, ...rest } =
    req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      age,
      phone,
      profileImage,
      ...rest,
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const { password: _, ...userWithoutPassword } = user._doc;

    return res.status(201).json({
      message: "User created",
      token,
      userId: user._id,
      ...userWithoutPassword,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user has a password
    if (!user.password) {
      return res.status(400).json({ message: "User does not have a password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    const { password: _, ...userWithoutPassword } = user._doc; // Exclude password from user document

    return res.status(200).json({
      message: "Logged In",
      token,
      userId: user._id,
      ...userWithoutPassword,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.verifyToken = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ user });
  } catch(error){
    res.status(500).json({ message: "Failed to verify token", error });
  }
}