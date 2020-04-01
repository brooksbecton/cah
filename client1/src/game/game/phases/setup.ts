import { IGame } from "./../types/index";
import { ActivePlayers } from "boardgame.io/core";
export function startGame(G: IGame) {
  return { ...G, gameStarted: true };
}

export const setup = {
  turn: {
    activePlayers: ActivePlayers.ALL
  },
  endIf: (G: IGame) => G?.gameStarted === true,
  start: true,
  next: "draw"
};
