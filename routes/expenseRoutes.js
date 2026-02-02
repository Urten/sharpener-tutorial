const express = require('express');
const {
  createExpense,
  getAllExpenses,
  deleteExpense,
  updateExpense
} = require('../controllers/expenseController');

const router = express.Router();

// Base path: /expenses

// POST /expenses - Create a new expense
router.post('/', createExpense);

// GET /expenses - Get all expenses
router.get('/', getAllExpenses);

// DELETE /expenses/:id - Delete an expense by ID
router.delete('/:id', deleteExpense);

// PUT /expenses/:id - Update an expense by ID (Bonus feature)
router.put('/:id', updateExpense);

module.exports = router;