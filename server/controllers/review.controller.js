const Review = require("../models/review.model");

// Create a Review
exports.createReview = async (req, res) => {
  try {
    const studentId = req.user._id; // here it will be user._id..because in mongoose we identify the id through _id
    const teacherId = req.params.id;

    const { title, content, rating } = req.body;
    const review = new Review({
      title,
      content,
      studentId,
      teacherId,
      rating,
    });
    await review.save();
    return res.status(201).json({ success: true, review });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// Fetch all reviews of a teacher
exports.getAllReviews = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const reviews = await Review.find({ teacherId }).populate(
      "studentId",
      "name"
    );
    return res.status(200).json({ success: true, reviews });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};