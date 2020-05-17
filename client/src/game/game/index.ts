import { IGame } from "./types";
import { defaultState } from "./defaultState";
import { setup, startGame } from "./phases/setup";
import { draw, drawCard } from "./phases/draw";
import { vote, voteCard } from "./phases/vote";
import { play, playCard } from "./phases/play";
import { showcase, endShowCase } from "./phases/showcase";
import groupBy from "lodash/groupBy";
import sortBy from "lodash/sortBy";

export const cah = {
  setup: (x: any, setupData = {}) => {
    return { ...defaultState, ...setupData };
  },
  moves: {
    startGame,
    drawCard,
    playCard,
    voteCard,
    endShowCase,
  },
  phases: {
    setup,
    draw,
    play,
    vote,
    showcase,
  },

  endIf: (G: IGame) => {
    const groupedWinnerCards = groupBy(G?.winnerCards, "playerID");
    const winningCards = Object.keys(groupedWinnerCards).map((playerId) => {
      return {
        playerId,
        winningCardCount: groupedWinnerCards[playerId].length,
      };
    });
    const sortedWinningCards = sortBy(
      winningCards,
      "winningCardCount"
    ).reverse();
    const leaderWinningCard = sortedWinningCards[0];
    return leaderWinningCard
      ? leaderWinningCard.winningCardCount >= G.winningCardAmount
        ? true
        : undefined
      : undefined;
  },

  onEnd: (G: IGame) => {
    G.gameOver = true;
  },
};

export default cah;
