import { fbd } from "services";
import { Matches } from "models";
import logger from "logger";
import { translate } from "translations";

/**
 * GET / route that responds with matches array
 * @param {object} req HTTP request argument
 * @param {object} res HTTP response argument
 */
export const getMatches = async (req, res, next) => {
  try {
    const matchesApiResponse = await fbd.getMatches();
    const matchesList = new Matches(matchesApiResponse.data);
    const translatedMatchesList = translate(matchesList, req.language);

    return res.json(translatedMatchesList);
  } catch (err) {
    logger.error(err.message);
    const error = new Error("Unknown error");

    error.status = 500;
    next(error);
  }
};
