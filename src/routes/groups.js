import { Router } from "express";
import { fbd } from "services";
import { Standings } from "models";
import logger from "logger";
import cacheMiddleware from "middlewares/cacheMiddleware";

const router = new Router({ "strict": true });

/**
 * GET / route that responds with group standings data
 * @param {object} req HTTP request argument
 * @param {object} res HTTP response argument
 */
router.get("/groups", cacheMiddleware("5 minutes"), async (req, res) => {
  try {
    const standingsResponse = await fbd.getStandings();
    const response = new Standings(standingsResponse.data);

    return res.json(response);
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ "error": "Unknown error" });
  }
});

export default router;
