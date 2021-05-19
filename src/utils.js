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

export const groupByDate = (dataArray) => {
  const groupedByDate = {};

  dataArray.map((match) => {
    const date = match.startDateTime.substring(0, 10);

    if (!groupedByDate.hasOwnProperty(date)) {
      groupedByDate[ date ] = [];
    }
    groupedByDate[ date ].push(
      match
    );
  });

  return groupedByDate;
};

export const getNextThreeDays = (data) => {
  const todaysDate = new Date().toISOString().split("T")[ 0 ];
  const filteredResults = {};

  let count = 2;

  Object.keys(data).map((date) => {
    if (date >= todaysDate && count >= 0) {
      filteredResults[ date ] = data[ date ];
      count--;
    }
  });

  return filteredResults;

};
