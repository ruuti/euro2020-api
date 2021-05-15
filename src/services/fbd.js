import "dotenv/config";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://api.football-data.org/v2",
  timeout: 5000,
  headers: {
    "X-Auth-Token": process.env.KEY
  }
});

export const getStandings = async () =>
  await instance.get("/competitions/2018/standings");
