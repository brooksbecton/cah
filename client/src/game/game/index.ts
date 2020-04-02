import { IGame } from "./types";
import { defaultState } from "./defaultState";
import { setup, startGame } from "./phases/setup";
import { draw, drawCard } from "./phases/draw";
import { vote, voteCard } from "./phases/vote";
import { play, playCard } from "./phases/play";

export const cah = {
  setup: (x: any, setupData = {}) => {
    return { ...defaultState, ...setupData };
  },
  moves: {
    startGame,
    drawCard,
    voteCard,
    playCard
  },
  phases: {
    setup,
    draw,
    play,
    vote
  },

  endIf: (G: IGame) => {
    // Separate player cards
    // Get counts for winning cards
    // End if any player has over a certain amount
    // Otherwise return undefined
    return G?.winnerCards.length >= 10 ? true : undefined;
  }
};

export default cah;
