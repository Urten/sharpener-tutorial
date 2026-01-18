const productService = require('../services/productService');

const productController = {
  // GET /products: Fetch all products
  getAllProducts: (req, res) => {
    const result = productService.getAllProducts();
    res.send(result);
  },

  // POST /products: Add a new product
  createProduct: (req, res) => {
    const result = productService.createProduct();
    res.send(result);
  },

  // GET /products/:id: Fetch a product by its ID
  getProductById: (req, res) => {
    const id = req.params.id;
    const result = productService.getProductById(id);
    res.send(result);
  }
};

module.exports = productController;
