import "dotenv/config";
import config from "config";
import logger from "logger";

export const getLogoUrl = (id) =>
  id ? `${process.env.BASE_URL}/${config.staticFileDirName}/${id}.svg` : null;

export const hasValidConfigs = () => {
  const requiredConfigs = [ {
    "name": "KEY"
  }, {
    "name": "BASE_URL"
  } ];
  const missingConfigsArray = [];

  requiredConfigs.map((requiredConfig) => {
    if (!process.env[ requiredConfig.name ]) {
      missingConfigsArray.push(requiredConfig.name);
    }
  });

  if (missingConfigsArray.length > 0) {
    logger.error(`Enviroment variables: "${missingConfigsArray.join("\", \"")}" missing!`);
    return false;
  }
  return true;

};
