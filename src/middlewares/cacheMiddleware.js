import { getFromCache, saveToCache } from "cache";

const cacheMiddleware = (duration) => {
  return async (req, res, next) => {
    const cacheKey = req.path;
    const cachedResponse = await getFromCache(cacheKey);

    if (cachedResponse) {
      res.json(cachedResponse);
      return;
    }

    res.sendResponse = res.json;
    res.json = async (body) => {
      await saveToCache(cacheKey, body, duration);
      res.sendResponse(body);
    };
    next();
  };
};

export default cacheMiddleware;
