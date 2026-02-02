const Expense = require('../models/Expense');

// Create a new expense
const createExpense = async (req, res) => {
  try {
    const { title, amount, description } = req.body;

    // Validate required fields
    if (!title || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Title and amount are required fields'
      });
    }

    // Validate amount is a number
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be a valid positive number'
      });
    }

    const expense = await Expense.create({
      title,
      amount: parseFloat(amount),
      description: description || ''
    });

    res.status(201).json({
      success: true,
      message: 'Expense created successfully',
      data: expense
    });
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get all expenses
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      order: [['createdAt', 'DESC']] // Show newest expenses first
    });

    res.status(200).json({
      success: true,
      data: expenses
    });
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Delete an expense by ID
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID is a number
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid expense ID'
      });
    }

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    await expense.destroy();

    res.status(200).json({
      success: true,
      message: 'Expense deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Update an expense by ID (Bonus feature)
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, description } = req.body;

    // Validate ID is a number
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid expense ID'
      });
    }

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    // Validate required fields if provided
    if (title !== undefined && !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Title cannot be empty'
      });
    }

    if (amount !== undefined) {
      if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Amount must be a valid positive number'
        });
      }
    }

    // Update the expense
    const updatedExpense = await expense.update({
      title: title !== undefined ? title : expense.title,
      amount: amount !== undefined ? parseFloat(amount) : expense.amount,
      description: description !== undefined ? description : expense.description
    });

    res.status(200).json({
      success: true,
      message: 'Expense updated successfully',
      data: updatedExpense
    });
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

module.exports = {
  createExpense,
  getAllExpenses,
  deleteExpense,
  updateExpense
};