const { Booking } = require('../models');

exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};