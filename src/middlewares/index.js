import cacheMiddleware from "middlewares/cacheMiddleware";
import errorHandlerMiddleware from "middlewares/errorHandlerMiddleware";
import notFoundMiddleware from "middlewares/notFoundMiddleware";
import versionHeaderMiddleware from "middlewares/versionHeaderMiddleware";
import languageHeaderMiddleware from "middlewares/languageHeaderMiddleware";

export {
  cacheMiddleware,
  errorHandlerMiddleware,
  notFoundMiddleware,
  versionHeaderMiddleware,
  languageHeaderMiddleware
};
