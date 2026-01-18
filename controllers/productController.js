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
    const productData = req.body;
    
    // Log product creation to console
    console.log('Creating new product:', productData);
    
    // Create the product using service
    const newProduct = productService.createProduct(productData);
    
    // Log the created product
    console.log('Product created successfully:', newProduct);
    
    // Return the created product as JSON
    res.json(newProduct);
  },

  // GET /products/:id: Fetch a product by its ID
  getProductById: (req, res) => {
    const id = req.params.id;
    const result = productService.getProductById(id);
    res.send(result);
  }
};

module.exports = productController;
