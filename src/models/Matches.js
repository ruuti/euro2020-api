export default class Matches {
  constructor (data) {
    this.matches = [];
    data.matches.map((match) => {
      const matchData = {
        "startDateTime": match.utcDate,
        "status": match.status,
        "stage": match.stage,
        "group": match.group,
        "homeTeam": match.homeTeam.name,
        "awayTeam": match.awayTeam.name
      };

      this.matches.push(matchData);
    });
  }
}
