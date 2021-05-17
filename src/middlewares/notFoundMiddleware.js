const notFoundMiddleware = (req, res, next) => {
  const error = new Error("Not found");

  error.status = 404;
  next(error);
};

export default notFoundMiddleware;
