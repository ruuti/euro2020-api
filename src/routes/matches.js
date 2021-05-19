import { Router } from "express";
import { cacheMiddleware } from "middlewares";
import { matchesController } from "controllers";

const router = new Router({ "strict": true });

/**
 * GET /matches route that responds with matches array
 * @param {object} req HTTP request argument
 * @param {object} res HTTP response argument
 */
router.get("/matches", cacheMiddleware("5 minutes"), matchesController.getMatches);

/**
 * GET /next-three-days-matches route that responds with matches array
 * @param {object} req HTTP request argument
 * @param {object} res HTTP response argument
 */
router.get("/next-three-days-matches", cacheMiddleware("5 minutes"), matchesController.getMatchesForNextThreeDays);

export default router;
