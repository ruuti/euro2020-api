import { Router } from "express";
import { cacheMiddleware } from "middlewares";
import { matchesController } from "controllers";

const router = new Router({ "strict": true });

/**
 * GET / route that responds with matches array
 * @param {object} req HTTP request argument
 * @param {object} res HTTP response argument
 */
router.get("/matches", cacheMiddleware("5 minutes"), matchesController.getMatches);

export default router;
