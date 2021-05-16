import { Router } from "express";
import apicache from "apicache";
import { fbd } from "services";
import { Standings } from "models";
import logger from "logger";

const router = new Router({ "strict": true });
const cache = apicache.middleware;

/**
 * GET / route that responds with group standings data
 * @param {object} req HTTP request argument
 * @param {object} res HTTP response argument
 */
router.get("/groups", cache("5 minutes"), async (req, res) => {
  try {
    const standingsResponse = await fbd.getStandings();
    const responseData = new Standings(standingsResponse.data);

    return res.send(responseData);
  } catch (error) {
    logger.error(error.message);
    return res.status(500).send({ "error": "Unknown error" });
  }
});

export default router;
