import { getLogoUrl } from "utils";

export default class Matches {
  constructor (data) {
    this.matches = [];
    data.matches.map((match) => {
      const matchData = {
        "startDateTime": match.utcDate,
        "status": match.status,
        "stage": match.stage,
        "group": match.group,
        "homeTeam": {
          "name": match.homeTeam.name,
          "logoUrl": getLogoUrl(match.homeTeam.id)
        },
        "awayTeam": {
          "name": match.awayTeam.name,
          "logoUrl": getLogoUrl(match.awayTeam.id)
        }
      };

      this.matches.push(matchData);
    });
  }
}
