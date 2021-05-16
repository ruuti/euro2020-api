import { Router } from "express";
import { fbd } from "services";
import Standings from "models/Standings";
import { getFromCache, saveToCache } from "cache";

const router = new Router();

/**
 * GET / route that responds with group standings data
 * @param {object} req HTTP request argument
 * @param {object} res HTTP response argument
 */
router.get("/", async (req, res) => {
  const cacheKey = "groupsList";
  const cachedResponse = await getFromCache(cacheKey);

  if (cachedResponse) {
    return res.send(cachedResponse);
  }

  try {
    const standingsResponse = await fbd.getStandings();
    const response = new Standings(standingsResponse.data);

    await saveToCache(cacheKey, response, "5 minutes");
    return res.send(response);
  } catch (error) {
    return res.status(500).send({ "error": "Unknown error" });
  }
});

export default router;
