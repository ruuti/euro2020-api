import "dotenv/config";
import express from "express";
import routes from "routes";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import compression from "compression";
import config from "config";
import { hasValidConfigs } from "utils";
import {
  versionHeaderMiddleware,
  errorHandlerMiddleware,
  notFoundMiddleware,
  languageHeaderMiddleware
} from "middlewares";
import requestLanguage from "express-request-language";

const app = express();

hasValidConfigs();

// Use compressions
app.use(compression());

// Enable CORS for all domains
const corsOptions = {
  "origin": "*",
  "optionsSuccessStatus": 200
};

app.use(cors(corsOptions));

// Enable Helmet
app.use(helmet());

// Enable trust proxy if service is running behind a reverse proxy
const TRUST_PROXY = parseInt(process.env.TRUST_PROXY) || 0;

app.set("trust proxy", TRUST_PROXY);

const limiter = rateLimit({
  "windowMs": 60 * 1000, // 1 minute
  // limit each IP to 60 requests per windowMs or use value from env variables
  "max": process.env.MAX_REQUESTS_PER_MINUTE || 60,
  "message": {
    "status": 429,
    "message": "Too many requests, please try again later."
  }
});

// Language support
app.use(requestLanguage({
  "languages": [ "en-US", "fi-FI" ]
}));

// Apply Content-Language header to all requests
app.use(languageHeaderMiddleware);

// Apply X-API-Version header to all requests
app.use(versionHeaderMiddleware);

// apply rate limiting to all requests
app.use(limiter);

// Add routes
app.use([
  routes.groups,
  routes.matches
]);

app.use(`/${config.staticFileDirName}`,
  express.static(config.staticFileDirName));

// 404 error in JSON
app.use(notFoundMiddleware);

// error handler middleware to return JSON errors
app.use(errorHandlerMiddleware);

export default app;
