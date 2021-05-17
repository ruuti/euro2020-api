const errorHandlerMiddleware = (error, req, res, next) => {
  res.status(error.status || 500).json({
    "status": error.status || 500,
    "message": error.message || "Unknown error"
  });
  next();
};

export default errorHandlerMiddleware;
