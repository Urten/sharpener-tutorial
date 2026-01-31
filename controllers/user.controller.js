const User = require('../models/user.model');

const addUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Name and email are required'
      });
    }

    const newUser = await User.create({ name, email });

    res.status(201).json({
      message: 'User created successfully',
      data: newUser
    });
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await User.destroy({
      where: { id }
    });

    if (!deleted) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found'
      });
    }

    res.json({
      message: 'User deleted successfully'
    });
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt']
    });

    res.json({
      data: users,
      count: users.length
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addUser,
  deleteUser,
  getAllUsers
};