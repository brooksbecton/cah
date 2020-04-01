import { Server } from "boardgame.io/server";
import { cah } from "./../client/src/game/game";
import dotenv from "dotenv";

const server = Server({ games: [cah] });

dotenv.config();

const port = Number(process.env.PORT);
server.run({ port });
