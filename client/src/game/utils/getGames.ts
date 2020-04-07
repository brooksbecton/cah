import * as request from "superagent";
import { serverUrl } from "./../../config/serverUrl";

export function getGames(): Promise<{
  rooms: Array<{
    gameID: number;
    players: Array<{ id: number; name: string }>;
  }>;
}> {
  return new Promise((resolve, reject) => {
    request.get(`${serverUrl}/games/default`).end((err, { body }) => {
      return !err ? resolve(body) : reject(err);
    });
  });
}
