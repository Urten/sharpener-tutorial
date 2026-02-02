const { User, Booking } = require('../models');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{
        model: Booking,
        include: ['Bus']
      }]
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.Bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};