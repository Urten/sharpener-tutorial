/**
 * Centralized response utilities for consistent API responses
 */

/**
 * Send a success response with consistent JSON format
 * @param {Object} res - Express response object
 * @param {Object} data - Response data
 * @param {number} status - HTTP status code (default: 200)
 */
const sendResponse = (res, data, status = 200) => {
  return res.status(status).json({
    success: true,
    status: status,
    data: data
  });
};

/**
 * Send an error response with consistent JSON format
 * @param {Object} res - Express response object
 * @param {number} status - HTTP status code
 * @param {string} message - Error message
 */
const sendErrorResponse = (res, status, message) => {
  return res.status(status).json({
    success: false,
    status: status,
    message: message
  });
};

module.exports = {
  sendResponse,
  sendErrorResponse
};
