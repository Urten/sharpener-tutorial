const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /products: Fetch all products
router.get('/', productController.getAllProducts);

// POST /products: Add a new product
router.post('/', productController.createProduct);

// GET /products/:id: Fetch a product by its ID
router.get('/:id', productController.getProductById);

module.exports = router;
