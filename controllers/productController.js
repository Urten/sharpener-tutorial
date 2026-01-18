const productService = require('../services/productService');
const path = require('path');

const productController = {
  // GET /products: Fetch all products
  getAllProducts: (req, res) => {
    // Serve the HTML file from the VIEW directory
    res.sendFile(path.join(__dirname, '../VIEW', 'index.html'));
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
