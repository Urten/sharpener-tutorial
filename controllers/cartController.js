const { sendResponse, sendErrorResponse } = require('../utils/errorUtils');

const cartController = {
  // GET /cart/:userId: Fetch the cart items for a specific user
  getCartByUserId: (req, res) => {
    try {
      const userId = req.params.userId;

      // Basic validation
      if (!userId || isNaN(userId)) {
        return sendErrorResponse(res, 400, 'Invalid user ID');
      }

      // In a real app, this would fetch cart from database
      const cart = {
        userId: parseInt(userId),
        items: [], // Placeholder for cart items
        total: 0
      };

      sendResponse(res, { cart });
    } catch (error) {
      sendErrorResponse(res, 500, 'Failed to fetch cart');
    }
  },

  // POST /cart/:userId: Add a product to the user's cart
  addToCart: (req, res) => {
    try {
      const userId = req.params.userId;
      const { productId, quantity } = req.body;

      // Basic validation
      if (!userId || isNaN(userId)) {
        return sendErrorResponse(res, 400, 'Invalid user ID');
      }

      if (!productId) {
        return sendErrorResponse(res, 400, 'Product ID is required');
      }

      if (!quantity || quantity < 1) {
        return sendErrorResponse(res, 400, 'Quantity must be at least 1');
      }

      // In a real app, this would add to database and return updated cart
      const cartItem = {
        productId: productId,
        quantity: parseInt(quantity),
        addedAt: new Date()
      };

      sendResponse(res, { cartItem }, 201);
    } catch (error) {
      sendErrorResponse(res, 500, 'Failed to add item to cart');
    }
  }
};

module.exports = cartController;
