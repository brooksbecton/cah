import path from "path";
import KoaStatic from "koa-static";
import { Server } from "boardgame.io/server";
import { cah } from "./index";
import Router from "koa-router";
import send from "koa-send";
import dotenv from 'dotenv';

const server = Server({ games: [cah] });
const router = new Router();
const buildPath = path.join(__dirname, "../dist");
dotenv.config();
// Forwarding all requests to base index for client routing
server.app.use(KoaStatic(buildPath));
router.get("/(.*)", async ctx => {
  await send(ctx, "dist/index.html");
});
server.app.use(router.routes());
server.run(Number(process.env.PORT));

console.log("Server Started on " + process.env.PORT);
