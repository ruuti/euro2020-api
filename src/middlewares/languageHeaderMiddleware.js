const languageHeaderMiddleware = (req, res, next) => {
  const languageCode = req.language;

  res.header("Content-Language", languageCode);
  next();
};

export default languageHeaderMiddleware;
