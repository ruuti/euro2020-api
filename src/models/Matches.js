import { Match } from "models";

export default class Matches {
  constructor (data) {
    this.matches = [];
    data.matches.map((match) => {
      const matchData = new Match(match);

      this.matches.push(matchData);
    });
  }
}
