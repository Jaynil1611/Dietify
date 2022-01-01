const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "error occured, see the error message key for more details",
    errorMessage: err.message,
  });
};

module.exports = { errorHandler };
