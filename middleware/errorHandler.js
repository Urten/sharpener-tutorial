const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Handle JSON parsing errors
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      error: 'Invalid JSON',
      message: 'Request body must be valid JSON'
    });
  }

  // Handle validation errors from our custom middleware
  if (err && err.error && err.message) {
    return res.status(400).json({
      error: err.error,
      message: err.message
    });
  }

  // Handle Sequelize validation errors
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      message: err.errors.map(e => e.message)
    });
  }

  // Handle duplicate email errors
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      error: 'Duplicate Entry',
      message: 'Email already exists'
    });
  }

  // Handle database errors
  if (err.name === 'SequelizeDatabaseError') {
    return res.status(500).json({
      error: 'Database Error',
      message: 'Internal server error'
    });
  }

  // Handle all other errors
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong'
  });
};

module.exports = errorHandler;