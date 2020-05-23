import { ActivePlayers } from "boardgame.io/core";

import { IGame, ICtx, ICard } from "../types/index";

export const voteCard = (G: IGame, ctx: ICtx, card: ICard) => {
  G.winnerCards = [...G?.winnerCards, card];
  G.isShowcasing = true;
};

export const vote = {
  turn: {
    activePlayers: ActivePlayers.ALL,
  },
  moves: { voteCard },
  endIf: (G: IGame) => G?.isShowcasing === true,

  next: "showcase",
};
