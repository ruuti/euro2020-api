import { getLogoUrl } from "utils";

export default class Match {
  constructor (data) {
    this.startDateTime = data.utcDate;
    this.status = data.status;
    this.stage = data.stage;
    this.group = data.group;
    this.homeTeam = {
      "name": data.homeTeam.name,
      "logoUrl": getLogoUrl(data.homeTeam.id)
    };
    this.awayTeam = {
      "name": data.awayTeam.name,
      "logoUrl": getLogoUrl(data.awayTeam.id)
    };
  }
}
