import { IGame } from "./types";
import { defaultState } from "./defaultState";
import { setup, startGame } from "./phases/setup";
import { draw, drawCard } from "./phases/draw";
import { vote, voteCard } from "./phases/vote";
import { play, playCard } from "./phases/play";
import groupBy from "lodash/groupBy";
import sortBy from "lodash/sortBy";

export const cah = {
  setup: (x: any, setupData = {}) => {
    return { ...defaultState, ...setupData };
  },
  moves: {
    startGame,
    drawCard,
    voteCard,
    playCard,
  },
  phases: {
    setup,
    draw,
    play,
    vote,
  },

  endIf: (G: IGame) => {
    const groupedWinnerCards = groupBy(G?.winnerCards, "playerID");
    const winningCards = Object.keys(groupedWinnerCards).map((playerId) => {
      return {
        playerId,
        winningCardCount: groupedWinnerCards[playerId].length,
      };
    });
    const sortedWinningCards = sortBy(winningCards, "winningCardCount");
    const leaderWinningCard = sortedWinningCards[0];

    return leaderWinningCard
      ? leaderWinningCard.winningCardCount >= 3
        ? true
        : undefined
      : undefined;
  },
};

export default cah;
