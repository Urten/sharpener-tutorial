const { Op } = require('sequelize');
const { sequelize, User, Bus } = require('../models');

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    throw err;
  }
}

async function createUser(userData) {
  const { name, email } = userData;
  try {
    const user = await User.create({ name, email });
    console.log(`User created: ID ${user.id}, Name: ${name}, Email: ${email}`);
    return { id: user.id, name, email };
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
  }
}

async function updateUser(id, userData) {
  const { name, email } = userData;
  try {
    const [updated] = await User.update({ name, email }, { where: { id } });

    if (updated === 0) {
      console.log(`No user found with ID ${id} to update`);
      return null;
    }

    console.log(`User updated: ID ${id}, Name: ${name}, Email: ${email}`);
    return { id, name, email };
  } catch (err) {
    console.error('Error updating user:', err);
    throw err;
  }
}

async function deleteUser(id) {
  try {
    const deleted = await User.destroy({ where: { id } });

    if (deleted === 0) {
      console.log(`No user found with ID ${id} to delete`);
      return false;
    }

    console.log(`User deleted: ID ${id}`);
    return true;
  } catch (err) {
    console.error('Error deleting user:', err);
    throw err;
  }
}

async function getUserById(id) {
  try {
    const user = await User.findByPk(id);
    return user ? user.get({ plain: true }) : null;
  } catch (err) {
    console.error('Error getting user:', err);
    throw err;
  }
}

async function getAllUsers() {
  try {
    const users = await User.findAll();
    console.log(`Retrieved ${users.length} users from database`);
    return users.map(user => user.get({ plain: true }));
  } catch (err) {
    console.error('Error getting all users:', err);
    throw err;
  }
}

async function createBus(busData) {
  const { busNumber, totalSeats, availableSeats } = busData;
  try {
    const bus = await Bus.create({ busNumber, totalSeats, availableSeats });
    console.log(`Bus created: ID ${bus.id}, Bus Number: ${busNumber}, Total Seats: ${totalSeats}, Available Seats: ${availableSeats}`);
    return { id: bus.id, busNumber, totalSeats, availableSeats };
  } catch (err) {
    console.error('Error creating bus:', err);
    throw err;
  }
}

async function getBusesByAvailableSeats(minSeats) {
  try {
    const buses = await Bus.findAll({ where: { availableSeats: { [Op.gt]: minSeats } } });
    console.log(`Retrieved ${buses.length} buses with available seats > ${minSeats}`);
    return buses.map(bus => bus.get({ plain: true }));
  } catch (err) {
    console.error('Error getting buses by available seats:', err);
    throw err;
  }
}

async function insertSampleData() {
  const sampleUsers = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' },
    { name: 'Bob Johnson', email: 'bob@example.com' }
  ];

  const sampleBuses = [
    { busNumber: 101, totalSeats: 50, availableSeats: 25 },
    { busNumber: 102, totalSeats: 40, availableSeats: 15 },
    { busNumber: 103, totalSeats: 60, availableSeats: 45 },
    { busNumber: 104, totalSeats: 30, availableSeats: 5 },
    { busNumber: 105, totalSeats: 70, availableSeats: 35 }
  ];

  try {
    // Insert sample users
    console.log('Inserting sample users...');
    for (const user of sampleUsers) {
      const createdUser = await User.create(user);
      console.log(`User created: ID ${createdUser.id}, Name: ${user.name}, Email: ${user.email}`);
    }

    // Insert sample buses
    console.log('Inserting sample buses...');
    for (const bus of sampleBuses) {
      const createdBus = await Bus.create(bus);
      console.log(`Bus created: ID ${createdBus.id}, Bus Number: ${bus.busNumber}, Total Seats: ${bus.totalSeats}, Available Seats: ${bus.availableSeats}`);
    }

    console.log('Sample data insertion completed successfully');
    return { usersInserted: sampleUsers.length, busesInserted: sampleBuses.length };
  } catch (err) {
    console.error('Error inserting sample data:', err);
    throw err;
  }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
  createBus,
  getBusesByAvailableSeats,
  insertSampleData,
  initializeDatabase
};
