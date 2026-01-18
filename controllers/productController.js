const productController = {
  // GET /products: Fetch all products
  getAllProducts: (req, res) => {
    res.send("Fetching all products");
  },

  // POST /products: Add a new product
  createProduct: (req, res) => {
    res.send("Adding a new product");
  },

  // GET /products/:id: Fetch a product by its ID
  getProductById: (req, res) => {
    const id = req.params.id;
    res.send(`Fetching product with ID: ${id}`);
  }
};

module.exports = productController;
