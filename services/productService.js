const productService = {
  // In-memory storage for products (in a real app, this would be a database)
  products: [],
  
  // Generate unique ID for products
  generateId: () => {
    return Math.floor(Math.random() * 1000000).toString();
  },

  // Business logic for fetching all products
  getAllProducts: () => {
    return "Fetching all products";
  },

  // Business logic for creating a new product
  createProduct: (productData) => {
    // Generate unique ID and timestamp
    const newProduct = {
      id: productService.generateId(),
      name: productData.name,
      createdAt: new Date().toISOString()
    };
    
    // Add to in-memory storage
    productService.products.push(newProduct);
    
    return newProduct;
  },

  // Business logic for fetching a product by its ID
  getProductById: (id) => {
    return `Fetching product with ID: ${id}`;
  }
};

module.exports = productService;
