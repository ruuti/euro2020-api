export default class Standings {
  constructor(data){
    this.groups = [];
    data.standings.map(group => {
      if(group.stage === "GROUP_STAGE"){
        const table = [];
        group.table.map((team) => {
          table.push({
            "team": team.team.name,
            "points": team.points,
            "playedGames": team.playedGames,
            "won": team.won,
            "draw": team.draw,
            "lost": team.lost,
            "crestUrl": team.team.crestUrl
          });
        });
        const groupData = {
          "name": group.group,
          "table": table
        };
        this.groups.push(groupData);
      }
    });
  }
}
