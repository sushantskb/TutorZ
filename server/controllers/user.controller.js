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

// Functionalities
exports.addTutor = async (req, res) => {
  try {
    console.log(req.user);
    const studentId = req.user._id; //logged in user
    const tutorId = req.params.id;

    // check if the logged-in user is a student
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can add tutors" });
    }

    // Find the tutor
    const tutor = await User.findById(tutorId);
    if (!tutor || tutor.role !== "tutor") {
      return res.status(404).json({ message: "Tutuor not found" });
    }

    // Add the tutor to the student's list and the student to the tutor's list
    const student = await User.findById(studentId);

    if (student.tutors.includes(tutorId)) {
      return res.status(400).json({ message: "Tutor already added" });
    }

    student.tutors.push(tutorId);
    tutor.students.push(studentId);

    await student.save();
    await tutor.save();

    return res
      .status(200)
      .json({ message: "Tutor added successfully", tutors: student.tutors });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Remove a tutor
exports.removeTutor = async (req, res) => {
  try {
    const userId = req.user._id; // logged in user
    const targetId = req.params.id; // ID of tutor/student to be removed

    // Find the student and tutor
    const user = await User.findById(userId);
    const targetUser = await User.findById(targetId);

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Logic for students to remove a tutor
    if (user.role === "student" && targetUser.role === "tutor") {
      const tutorIndex = user.tutors.indexOf(targetId);
      const studentIndex = targetUser.students.indexOf(userId);

      if (tutorIndex === -1 || studentIndex === -1) {
        return res.status(404).json({
          message:
            "Tutor not found in student's list or Student not found in tutor's list",
        });
      }

      user.tutors.splice(tutorIndex, 1);
      targetUser.students.splice(studentIndex, 1);
      // Logic for tutors to remove a student
    } else if (user.role === "tutor" && targetUser.role === "student") {
      const studentIndex = user.students.indexOf(targetId);
      const tutorIndex = targetUser.tutors.indexOf(userId);

      if (studentIndex === -1 || tutorIndex === -1) {
        return res
          .status(404)
          .json({
            message:
              "Student not found in tutor's list or tutor not found in student's list",
          });
      }

      user.students.splice(studentIndex, 1);
      targetUser.tutors.splice(tutorIndex, 1);

    } else {
      return res.status(400).json({ message: "Invalid role combination" })
    }
    await user.save();
    await targetUser.save();

    return res.status(200).json({ message: "Successfully removed", targetId });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
};
