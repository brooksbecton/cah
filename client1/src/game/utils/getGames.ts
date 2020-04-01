import * as request from "superagent";
import { url } from "./../../config/url";

export function getGames(): Promise<{
  rooms: Array<{
    gameID: number;
    players: Array<{ id: number; name: string }>;
  }>;
}> {
  return new Promise((resolve, reject) => {
    request.get(`${url}/games/default`).end((err, { body }) => {
      return !err ? resolve(body) : reject(err);
    });
  });
}
