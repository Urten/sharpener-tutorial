const cartController = {
  // GET /cart/:userId: Fetch the cart items for a specific user
  getCartByUserId: (req, res) => {
    const userId = req.params.userId;
    res.send(`Fetching cart for user with ID: ${userId}`);
  },

  // POST /cart/:userId: Add a product to the user's cart
  addToCart: (req, res) => {
    const userId = req.params.userId;
    res.send(`Adding product to cart for user with ID: ${userId}`);
  }
};

module.exports = cartController;
