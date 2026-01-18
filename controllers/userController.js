const userController = {
  // GET /users: Fetch all users
  getAllUsers: (req, res) => {
    res.send("Fetching all users");
  },

  // POST /users: Add a new user
  createUser: (req, res) => {
    res.send("Adding a new user");
  },

  // GET /users/:id: Fetch a user by their ID
  getUserById: (req, res) => {
    const id = req.params.id;
    res.send(`Fetching user with ID: ${id}`);
  }
};

module.exports = userController;
