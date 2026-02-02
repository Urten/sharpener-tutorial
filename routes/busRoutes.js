const express = require('express');
const router = express.Router();
const busController = require('../controllers/busController');

router.post('/', busController.createBus);
router.get('/:id/bookings', busController.getBusBookings);

module.exports = router;