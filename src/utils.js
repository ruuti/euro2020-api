import "dotenv/config";
import config from "config";

export const getLogoUrl = (id) =>
  id ? `${process.env.BASE_URL}/${config.staticFileDirName}/${id}.svg` : null;
