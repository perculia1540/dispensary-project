// Catches anything that falls through (bad JSON, unexpected errors, etc.)
function errorHandler(err, req, res, next) {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
  });
}

// 404 handler for unmatched routes
function notFound(req, res) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
}

module.exports = { errorHandler, notFound };
