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
router.post("/:id", authenticate, createReview); // this is teacher id

// Fetch all reviews of a teacher
router.get("/teacher/:id", authenticate, getAllReviews);

// Fetch a particular review
router.get("/:id", authenticate, getReviewById); // this is review id

// Update a Review
router.put("/:id", authenticate, updateReview); // this is review id

// Delete a review
router.delete("/:id", authenticate, deleteReview);

// Like a review
router.post("/:id/like", authenticate, likeReview);

// Reply to review
router.post("/:id/reply", authenticate, replyToReview);

module.exports = router;
