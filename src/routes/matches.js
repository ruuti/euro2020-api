import { Router } from "express";
import { fbd } from "services";
import { Matches } from "models";
import logger from "logger";
import cacheMiddleware from "middlewares/cacheMiddleware";

const router = new Router({ "strict": true });

/**
 * GET / route that responds with matches array
 * @param {object} req HTTP request argument
 * @param {object} res HTTP response argument
 */
router.get("/matches", cacheMiddleware("5 minutes"), async (req, res) => {
  try {
    const matchesResponse = await fbd.getMatches();
    const response = new Matches(matchesResponse.data);

    return res.json(response);
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ "error": "Unknown error" });
  }
});

export default router;
