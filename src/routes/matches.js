import { Router } from "express";
import apicache from "apicache";
import { fbd } from "services";
import { Matches } from "models";
import logger from "logger";

const router = new Router({ "strict": true });
const cache = apicache.middleware;

/**
 * GET / route that responds with matches array
 * @param {object} req HTTP request argument
 * @param {object} res HTTP response argument
 */
router.get("/matches", cache("5 minutes"), async (req, res) => {
  try {
    const matchesResponse = await fbd.getMatches();
    const response = new Matches(matchesResponse.data);

    return res.send(response);
  } catch (error) {
    logger.error(error.message);
    return res.status(500).send({ "error": "Unknown error" });
  }
});

export default router;
