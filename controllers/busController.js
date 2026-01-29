const { createBus, getBusesByAvailableSeats, insertSampleData, getAllUsers } = require('../db/service');

async function createBusController(req, res) {
  try {
    const { busNumber, totalSeats, availableSeats } = req.body;

    // Validate input
    if (!busNumber || !totalSeats || !availableSeats) {
      return res.status(400).json({
        success: false,
        message: 'Bus number, total seats, and available seats are required'
      });
    }

    // Validate that available seats doesn't exceed total seats
    if (availableSeats > totalSeats) {
      return res.status(400).json({
        success: false,
        message: 'Available seats cannot exceed total seats'
      });
    }

    const bus = await createBus({ busNumber, totalSeats, availableSeats });
    res.status(201).json({
      success: true,
      message: 'Bus created successfully',
      data: bus
    });
  } catch (err) {
    console.error('Controller error creating bus:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message
    });
  }
}

async function getBusesByAvailableSeatsController(req, res) {
  try {
    const { seats } = req.params;
    const minSeats = parseInt(seats);

    if (isNaN(minSeats) || minSeats < 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid seats parameter. Must be a non-negative number'
      });
    }

    const buses = await getBusesByAvailableSeats(minSeats);
    res.json({
      success: true,
      message: `Found ${buses.length} buses with available seats > ${minSeats}`,
      data: buses
    });
  } catch (err) {
    console.error('Controller error getting buses by available seats:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message
    });
  }
}

async function insertSampleDataController(req, res) {
  try {
    const result = await insertSampleData();
    res.json({
      success: true,
      message: 'Sample data inserted successfully',
      data: result
    });
  } catch (err) {
    console.error('Controller error inserting sample data:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to insert sample data',
      error: err.message
    });
  }
}

async function getAllUsersController(req, res) {
  try {
    const users = await getAllUsers();
    res.json({
      success: true,
      message: `Retrieved ${users.length} users`,
      data: users
    });
  } catch (err) {
    console.error('Controller error getting all users:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message
    });
  }
}

module.exports = {
  createBusController,
  getBusesByAvailableSeatsController,
  insertSampleDataController,
  getAllUsersController
};
