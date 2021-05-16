import "dotenv/config";
import winston from "winston";

const logger = winston.createLogger({
  "transports": [
    new winston.transports.File({
      "filename": `${__dirname}/../logs/error.log`,
      "level": "error"
    })
  ]
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console({
    "format": winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

export default logger;
