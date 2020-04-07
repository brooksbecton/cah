import * as request from "superagent";
import { serverUrl } from "./../../config/serverUrl";

export function createGame(numPlayers: number): Promise<string> {
  return new Promise((resolve, reject) => {
    return request
      .post(`${serverUrl}/games/default/create`)
      .send({
        numPlayers
      })
      .end((err, { body }) => {
        !err ? resolve(body.gameID) : reject(err);
      });
  });
}
