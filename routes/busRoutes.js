const express = require('express');
const router = express.Router();
const {
  createBusController,
  getBusesByAvailableSeatsController,
  insertSampleDataController,
  getAllUsersController
} = require('../controllers/busController');

// Create a new bus
router.post('/', createBusController);

// Get buses with available seats greater than specified number
router.get('/available/:seats', getBusesByAvailableSeatsController);

// Insert sample data
router.post('/sample-data', insertSampleDataController);

// Get all users (this could also be in userRoutes, but keeping here for organization)
router.get('/users', getAllUsersController);

module.exports = router;