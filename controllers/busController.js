const { Bus, Booking } = require('../models');

exports.createBus = async (req, res) => {
  try {
    const bus = await Bus.create(req.body);
    res.json(bus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBusBookings = async (req, res) => {
  try {
    const bus = await Bus.findByPk(req.params.id, {
      include: [{
        model: Booking,
        include: ['User']
      }]
    });
    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }
    res.json(bus.Bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};