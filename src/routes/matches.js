import { Router } from "express";
import apicache from "apicache";
import { fbd } from "services";
import Matches from "models/Matches";

const router = new Router();
const cache = apicache.middleware;

/**
 * GET / route that responds with matches array
 * @param {object} req HTTP request argument
 * @param {object} res HTTP response argument
 */
router.get("/", cache("5 minutes"), async (req, res) => {
  try {
    const matchesResponse = await fbd.getMatches();
    const response = new Matches(matchesResponse.data);

    return res.send(response);
  } catch (error) {
    return res.status(500).send({ "error": "Unknown error" });
  }
});

export default router;