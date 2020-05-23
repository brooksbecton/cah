import { Server } from "boardgame.io/server";
import dotenv from "dotenv";
import * as Sentry from '@sentry/node';

import { cah } from "./../client/src/game/game";

const server = Server({ games: [cah] });

dotenv.config();

const port = Number(process.env.PORT);

Sentry.init({ dsn: 'https://b7c5fc6639b54250b329c849d3ddf7d2@o397091.ingest.sentry.io/5251277' });

server.run({ port });
