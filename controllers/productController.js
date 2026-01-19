const { sendResponse, sendErrorResponse } = require('../utils/errorUtils');
const productService = require('../services/productService');
const path = require('path');

const productController = {
  // GET /products: Fetch all products
  getAllProducts: (req, res) => {
    try {
      // For API requests, return JSON; for browser requests, serve HTML
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        // In a real app, this would fetch from database
        const products = productService.products || [];
        sendResponse(res, { products });
      } else {
        // Serve the HTML file from the VIEW directory
        res.sendFile(path.join(__dirname, '../VIEW', 'index.html'));
      }
    } catch (error) {
      sendErrorResponse(res, 500, 'Failed to fetch products');
    }
  },

  // POST /products: Add a new product
  createProduct: (req, res) => {
    try {
      const productData = req.body;

      // Basic validation
      if (!productData.name) {
        return sendErrorResponse(res, 400, 'Product name is required');
      }

      // Log product creation to console
      console.log('Creating new product:', productData);

      // Create the product using service
      const newProduct = productService.createProduct(productData);

      // Log the created product
      console.log('Product created successfully:', newProduct);

      sendResponse(res, { product: newProduct }, 201);
    } catch (error) {
      console.error('Error creating product:', error);
      sendErrorResponse(res, 500, 'Failed to create product');
    }
  },

  // GET /products/:id: Fetch a product by its ID
  getProductById: (req, res) => {
    try {
      const id = req.params.id;

      // Basic validation
      if (!id) {
        return sendErrorResponse(res, 400, 'Product ID is required');
      }

      const result = productService.getProductById(id);

      if (!result || result === `Fetching product with ID: ${id}`) {
        return sendErrorResponse(res, 404, 'Product not found');
      }

      sendResponse(res, { product: result });
    } catch (error) {
      console.error('Error fetching product:', error);
      sendErrorResponse(res, 500, 'Failed to fetch product');
    }
  }
};

module.exports = productController;
