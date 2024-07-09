const Assignment = require("../models/assignment.model");
const User = require("../models/user.model");

// create assignment
exports.createAssignment = async (req, res) => {
  try {
    const { name, pdfUrl, student } = req.body;
    const tutorId = req.user._id;

    // if the logged in user is tutor or not
    if (req.user.role !== "tutor") {
      return res
        .status(403)
        .json({ message: "Only tutors can create an assignment" });
    }

    // check if the students are in the tutor's list
    const tutor = await User.findById(tutorId);
    const students = tutor.students.map((studentId) => {
      return studentId.toString();
    });

    const filteredStudent = students.filter(
      (studentId) => studentId === student
    );

    const newAssignment = new Assignment({
      name,
      pdfUrl,
      tutor: tutorId,
      student: filteredStudent,
    });

    await newAssignment.save();

    return res
      .status(201)
      .json({ message: "Assignment created successfully", newAssignment });
  } catch (error) {
    console.log("Error creating assignment: ", error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

// get all assignments for the logged in user
exports.getAssignments = async (req, res) => {
  try {
    const userId = req.user._id;
    let assignments;

    if (req.user.role === "tutor") {
      assignments = await Assignment.find({ tutor: userId }).populate(
        "student",
        "fullname"
      );
    } else if (req.user.role === "student") {
      assignments = await Assignment.find({
        student: userId,
      }).populate("tutor", "fullname");
    }

    return res.status(200).json(assignments);
  } catch (error) {
    console.log("Error fetching assignments: ", error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

exports.getAssignmentsById = async (req, res) => {
  try {
    const assignmentId = req.params.id;
    const assignment = await Assignment.findById(assignmentId).populate(
      "student",
      "fullname"
    );

    if (!assignment) {
      return res.status(404).json({ message: "Assignemnt not found" });
    }

    return res.status(200).json(assignment);
  } catch (error) {
    console.log("Error fetching assignment: ", error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

// submit assignement
exports.submitAssignment = async (req, res) => {
  try {
    const studentId = req.user._id;
    const assignmentId = req.params.id;
    const { submissionUrl } = req.body;

    if (req.user.role !== "student") {
      return res
        .status(403)
        .json({ message: "Only students can submit assignments" });
    }

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    if (assignment.student.toString() === studentId) {
      assignment.submission = submissionUrl;
    } else {
        throw new Error("You are not assigned this assignment")
    }

    await assignment.save();

    return res
      .status(200)
      .json({ message: "Assignment submitted successfully" });
  } catch (error) {
    console.log("Error submitting assignment: ", error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

// update the assignment status
exports.updateAssignmentStatus = async (req, res) => {
  try {
    const tutorId = req.user._id;
    const assignmentId = req.params.id;
    const { status } = req.body;

    if (req.user.role !== "tutor") {
      return res
        .status(403)
        .json({ message: "Only tutors can update assignment status" });
    }

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    if (assignment.tutor.toString() !== tutorId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this assignment" });
    }

    assignment.status = status;

    await assignment.save();

    return res
      .status(200)
      .json({ message: "Assignment status updated successfully" });
  } catch (error) {
    console.log("Error updating assignment status: ", error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
};
