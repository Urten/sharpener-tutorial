const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// GET /cart/:userId: Fetch the cart items for a specific user
router.get('/:userId', cartController.getCartByUserId);

// POST /cart/:userId: Add a product to the user's cart
router.post('/:userId', cartController.addToCart);

module.exports = router;
