const jsonValidator = (req, res, next) => {
  // Check Content-Type header
//   if (!req.is('application/json')) {
//     return res.status(400).json({
//       error: 'Invalid Content-Type',
//       message: 'Content-Type must be application/json'
//     });
//   }

  // Check if body exists
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: 'Empty Request Body',
      message: 'Request body cannot be empty'
    });
  }

  // Validate JSON structure
  try {
    // Attempt to parse the body to ensure it's valid JSON
    const parsedBody = JSON.parse(JSON.stringify(req.body));

    // Check for required fields in POST /users
    if (req.method === 'POST' && req.path === '/users') {
      const { name, email } = parsedBody;

      if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'Name is required and must be a non-empty string'
        });
      }

      if (!email || typeof email !== 'string' || email.trim() === '') {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'Email is required and must be a non-empty string'
        });
      }

      // Basic email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          error: 'Validation Error',
          message: 'Invalid email format'
        });
      }
    }
  } catch (error) {
    return res.status(400).json({
      error: 'Invalid JSON',
      message: 'Request body must be valid JSON'
    });
  }

  next();
};

module.exports = jsonValidator;