import { Router } from "express";
import { fbd } from "services";
import { Matches } from "models";
import logger from "logger";
import { getFromCache, saveToCache } from "cache";

const router = new Router({ "strict": true });

/**
 * GET / route that responds with matches array
 * @param {object} req HTTP request argument
 * @param {object} res HTTP response argument
 */
router.get("/matches", async (req, res) => {
  const cacheKey = "matchesList";
  const cachedResponse = await getFromCache(cacheKey);

  if (cachedResponse) {
    return res.send(cachedResponse);
  }

  try {
    const matchesResponse = await fbd.getMatches();
    const response = new Matches(matchesResponse.data);

    await saveToCache(cacheKey, response, "5 minutes");
    return res.send(response);
  } catch (error) {
    logger.error(error.message);
    return res.status(500).send({ "error": "Unknown error" });
  }
});

export default router;
