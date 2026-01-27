const express = require('express');
const router = express.Router();
const {
  createUserController,
  updateUserController,
  deleteUserController
} = require('../controllers/userController');

// Create a new user
router.post('/', createUserController);

// Update an existing user
router.put('/:id', updateUserController);

// Delete a user
router.delete('/:id', deleteUserController);

module.exports = router;