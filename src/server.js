import "dotenv/config";
import express from "express";
import routes from "routes";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import compression from "compression";
import config from "config";
import { hasValidConfigs } from "utils";

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
const TRUST_PROXY = process.env.TRUST_PROXY || 0;

app.set("trust proxy", TRUST_PROXY);

const limiter = rateLimit({
  "windowMs": 60 * 1000, // 1 minute
  // limit each IP to 60 requests per windowMs or use value from env variables
  "max": process.env.MAX_REQUESTS_PER_MINUTE || 60,
  "message": {
    "error": "Too many requests, please try again later."
  }
});
// apply rate limiting to all requests

app.use(limiter);

// Add /groups endpoints
app.use("/euro2020", routes.groups);

// Add /matches endpoints
app.use("/euro2020", routes.matches);

app.use(`/${config.staticFileDirName}`,
  express.static(config.staticFileDirName));

export default app;
