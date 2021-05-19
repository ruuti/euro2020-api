import { fbd } from "services";
import { Standings } from "models";
import logger from "logger";
import { translate } from "translations";

/**
 * GET / route that responds with group standings data
 * @param {object} req HTTP request argument
 * @param {object} res HTTP response argument
 */
export const getGroups = async (req, res, next) => {
  try {
    const groupsApiResponse = await fbd.getStandings();
    const groupsList = new Standings(groupsApiResponse.data);
    const translatedGroupsList = translate(groupsList, req.language);

    return res.json(translatedGroupsList);
  } catch (err) {
    logger.error(err.message);
    const error = new Error("Unknown error");

    error.status = 500;
    next(error);
  }
};
