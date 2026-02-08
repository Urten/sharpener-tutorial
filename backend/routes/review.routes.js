const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');

// GET /api/reviews/:companyName - Get all reviews for a company
router.get('/:companyName', reviewController.getCompanyReviews);

// POST /api/reviews - Add a new review
router.post('/', reviewController.addReview);

module.exports = router;
