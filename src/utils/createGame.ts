import * as request from "superagent";
import { url } from "./../../src/config/url";

export function createGame(numPlayers: number): Promise<string> {
  return new Promise((resolve, reject) => {
    return request
      .post(`${url}/games/default/create`)
      .send({
        numPlayers,
      })
      .end((err, { body }) => {
        !err ? resolve(body.gameID) : reject(err);
      });
  });
}
