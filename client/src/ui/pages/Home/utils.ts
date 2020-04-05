import request from "superagent";

import { IRoom } from "./../../../game/game/types";
import { url } from "./../../../config/url";

/**
 * Adds a player to a game and returns a string
 * that represents their credentials to be in that game room
 */
export function joinGame({
  gameId,
  playerId,
  playerName
}: {
  gameId: string;
  playerId: string;
  playerName: string;
}): Promise<string> {
  return new Promise(async (resolve, reject) => {
    request
      .post(`${url}/games/default/${gameId}/join`)
      .send({
        playerID: playerId,
        playerName
      })
      .end((error, { body }) => {
        if (error) {
          reject(error);
        } else {
          resolve(body.playerCredentials);
        }
      });
  });
}

export function getGames(): Promise<IRoom[]> {
  return new Promise(async (resolve, reject) => {
    request
      .get(`${url}/games/default`)
      .send()
      .end((error, { body }) => {
        if (error) {
          reject(error);
        } else {
          resolve(body.rooms);
        }
      });
  });
}

/**
 * Creates a new game and returns the new game's id
 */
export function createGame(numPlayers: number): Promise<string> {
  return new Promise(async (resolve, reject) => {
    request
      .post(`${url}/games/default/create`)
      .send({
        numPlayers
      })
      .end((err, { body }) => {
        if (err) {
          reject(err);
        } else {
          resolve(body.gameID);
        }
      });
  });
}
