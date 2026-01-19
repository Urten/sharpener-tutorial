const { sendResponse, sendErrorResponse } = require('../utils/errorUtils');

const userController = {
  // GET /users: Fetch all users
  getAllUsers: (req, res) => {
    try {
      // In a real app, this would fetch from database
      const users = []; // Placeholder for user data
      sendResponse(res, { users });
    } catch (error) {
      sendErrorResponse(res, 500, 'Failed to fetch users');
    }
  },

  // POST /users: Add a new user
  createUser: (req, res) => {
    try {
      const userData = req.body;

      // Basic validation
      if (!userData.name || !userData.email) {
        return sendErrorResponse(res, 400, 'Name and email are required');
      }

      // In a real app, this would save to database
      const newUser = {
        id: Date.now(), // Simple ID generation
        name: userData.name,
        email: userData.email,
        createdAt: new Date()
      };

      sendResponse(res, { user: newUser }, 201);
    } catch (error) {
      sendErrorResponse(res, 500, 'Failed to create user');
    }
  },

  // GET /users/:id: Fetch a user by their ID
  getUserById: (req, res) => {
    try {
      const id = req.params.id;

      // Basic validation
      if (!id || isNaN(id)) {
        return sendErrorResponse(res, 400, 'Invalid user ID');
      }

      // In a real app, this would fetch from database
      // For now, simulate not found
      const user = null; // Placeholder

      if (!user) {
        return sendErrorResponse(res, 404, 'User not found');
      }

      sendResponse(res, { user });
    } catch (error) {
      sendErrorResponse(res, 500, 'Failed to fetch user');
    }
  }
};

module.exports = userController;
