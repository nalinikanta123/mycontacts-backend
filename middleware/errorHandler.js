const { STATUS_CODES } = require('../constant');

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== STATUS_CODES.OK ? res.statusCode : STATUS_CODES.INTERNAL_SERVER_ERROR;
  res.status(statusCode);
  res.json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};

module.exports = errorHandler;