import { getFromCache, saveToCache } from "cache";

const cacheMiddleware = (duration) => {
  return async (req, res, next) => {
    const languageCode = req.language;
    const cacheKey = `${req.path}${languageCode}`;
    const cachedResponse = await getFromCache(cacheKey);

    if (cachedResponse) {
      res.status(cachedResponse.statusCode);
      res.json(cachedResponse.body);
      return;
    }

    res.sendResponse = res.json;
    res.json = async (body) => {
      const { statusCode } = res;

      await saveToCache(cacheKey, { body, statusCode }, duration);
      res.sendResponse(body);
    };
    next();
  };
};

export default cacheMiddleware;
