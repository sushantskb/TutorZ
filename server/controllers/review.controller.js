const Review = require("../models/review.model");

// Create a Review
exports.createReview = async (req, res) => {
  try {
    const studentId = req.user._id; // here it will be user._id..because in mongoose we identify the id through _id
    const teacherId = req.params.id;

    // log to check the studentId
    // console.log("studentId: ", studentId);

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
    console.log(error);
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
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Fetch a particular review
exports.getReviewById = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await Review.findById(reviewId).populate(
      "studentId",
      "name"
    );
    if (!review) {
      return res
        .status(404)
        .json({ success: false, error: "Review not Found" });
    }
    return res.status(200).json({ success: true, review });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Update a Review
exports.updateReview = async (req, res) => {
  try {
    const userId = req.user.userId;
    const reviewId = req.params.id;
    const { content, rating } = req.body;
    const user = await Review.findById(reviewId);
    if (userId !== user.studentId) {
      return res
        .status(400)
        .json({ success: false, message: "You are not authorized" });
    }
    const review = await Review.findByIdAndUpdate(
      reviewId,
      { content, rating },
      { new: true }
    );
    if (!review) {
      return res
        .status(404)
        .json({ success: false, error: "Review not Found" });
    }
    return res.status(200).json({ success: true, review });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const userId = req.user.userId;
    const reviewId = req.params.id;
    const user = await Review.findById(reviewId);
    if (userId !== user.studentId) {
      return res
        .status(400)
        .json({ success: false, message: "You are not authorized" });
    }
    await Review.findByIdAndDelete(reviewId);
    return res
      .status(200)
      .json({ success: true, message: "Successfully deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Like a review
exports.likeReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    // const userId = req.user.userId;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not Found" });
    }
    review.likesCount += 1;
    review.save();
    return res.status(201).json({ success: true, review });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Reply to review
exports.replyToReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { content } = req.body;
    const replyBy = req.user.userId;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res
        .status(400)
        .json({ success: false, message: "Reply content is required" });
    }

    review.replies.push({ content, replyBy, replyDate: new Date() });
    await review.save();
    return res.status(201).json({ success: true, review });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
