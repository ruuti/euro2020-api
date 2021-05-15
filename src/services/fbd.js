import "dotenv/config";
import axios from "axios";

const instance = axios.create({
  "baseURL": "http://api.football-data.org/v2",
  "timeout": 5000,
  "headers": {
    "X-Auth-Token": process.env.KEY
  }
});

/**
 * Get Standings for Euro 2020 competition.
 * @returns {Promise}
 */
export const getStandings = async (id = "2018") =>
  await instance.get(`/competitions/${id}/standings`);
/**
 * Get all matches for Euro 2020 competition.
 * @returns {Promise}
 */
export const getMatches = async (id = "2018") =>
  await instance.get(`/competitions/${id}/matches`);
/**
 * Get all teams for Euro 2020 competition.
 * @returns {Promise}
 */
export const getTeams = async (id = "2018") =>
  await instance.get(`/competitions/${id}/teams`);
