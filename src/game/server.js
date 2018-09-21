import path from "path";
import KoaStatic from "koa-static";
import { Server } from "boardgame.io/server";
import { cah } from "./index";

const server = Server({ games: [cah] });
const buildPath = path.join(__dirname, "../dist");

server.app.use(KoaStatic(buildPath));
server.run(5555);

console.log("Server Started");
