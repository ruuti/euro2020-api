import { general, fbd } from "services";
import { writeFile } from "fs/promises";
import { existsSync, mkdirSync } from "fs";
import config from "config";

const getAndStoreLogos = async () => {
  const teamsResponse = await fbd.getTeams("2018");
  const staticDir = `${__dirname}/../${config.staticFileDirName}`;

  if (!existsSync(staticDir)) {
    mkdirSync(staticDir);
  }

  teamsResponse.data.teams.map(async (team) => {
    const { id, crestUrl } = team;
    const logoResponse = await general.getFileFromUrl(crestUrl);

    await writeFile(`${staticDir}/${id}.svg`, logoResponse.data);
  });
};

getAndStoreLogos();
