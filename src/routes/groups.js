import { Router } from "express";
import { cacheMiddleware } from "middlewares";
import { groupsController } from "controllers";

const router = new Router({ "strict": true });

router.get("/groups", cacheMiddleware("5 minutes"), groupsController.getGroups);

export default router;
