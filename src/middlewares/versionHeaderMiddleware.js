import packageJSON from "../../package.json";

const versionHeaderMiddleware = (req, res, next) => {
  res.header("X-API-Version", packageJSON.version);
  next();
};

export default versionHeaderMiddleware;
