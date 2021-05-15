import "core-js/stable";
import "regenerator-runtime/runtime";
import "dotenv/config";
import server from "server";

const PORT = process.env.PORT || 3000;

server.listen(PORT);
