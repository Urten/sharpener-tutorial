const productService = {
  // Business logic for fetching all products
  getAllProducts: () => {
    return "Fetching all products";
  },

  // Business logic for creating a new product
  createProduct: () => {
    return "Adding a new product";
  },

  // Business logic for fetching a product by its ID
  getProductById: (id) => {
    return `Fetching product with ID: ${id}`;
  }
};

module.exports = productService;
