const { createUser, updateUser, deleteUser, getUserById } = require('../db/service');

async function createUserController(req, res) {
  try {
    const { name, email } = req.body;

    // Validate input
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }

    const user = await createUser({ name, email });
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user
    });
  } catch (err) {
    console.error('Controller error creating user:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message
    });
  }
}

async function updateUserController(req, res) {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    // Validate input
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }

    const user = await updateUser(parseInt(id), { name, email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User with ID ${id} not found`
      });
    }

    res.json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (err) {
    console.error('Controller error updating user:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message
    });
  }
}

async function deleteUserController(req, res) {
  try {
    const { id } = req.params;

    const success = await deleteUser(parseInt(id));

    if (!success) {
      return res.status(404).json({
        success: false,
        message: `User with ID ${id} not found`
      });
    }

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (err) {
    console.error('Controller error deleting user:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message
    });
  }
}

module.exports = {
  createUserController,
  updateUserController,
  deleteUserController
};