const express = require("express");
const router = express.Router();
const { authenticate } = require("../auth/authenticate");
const {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
  likeReview,
  replyToReview,
} = require("../controllers/review.controller");

// Create a Review
router.post("/create-review/:id", authenticate, createReview); // this is teacher id

// Fetch all reviews of a teacher
router.get("/all-reviews/:id", authenticate, getAllReviews);

module.exports = router;
