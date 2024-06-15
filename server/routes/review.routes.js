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

// Fetch a particular review
router.get("/review/:id", authenticate, getReviewById); // this is review id

// Update a Review
router.put("/update-review/:id", authenticate, updateReview); // this is review id

// Delete a review
router.delete("/delete-review:id", authenticate, deleteReview);

// Like a review
router.post("/like/:id", authenticate, likeReview); // should follow this convention

// Reply to review
router.post("/reply/:id", authenticate, replyToReview); // should follow this convention

module.exports = router;
