import { ActivePlayers } from "boardgame.io/core";

import { IGame, ICtx } from "../types/index";
import { replenishPlayersCards } from "../replenishPlayersCards";
import { drawCard as drawCardUtil } from "../../utils/drawCard";

export const endShowCase = (G: IGame) => {
  G.isShowcasing = false;
};

export const showcase = {
  turn: {
    activePlayers: ActivePlayers.ALL,
  },
  moves: { endShowCase },
  endIf: (G: IGame) => G?.isShowcasing === false,
  onEnd: (G: IGame, ctx: ICtx) => {
    const { card, deck } = drawCardUtil(G?.blackCards);
    return {
      ...G,
      ...replenishPlayersCards(G),
      blackCards: deck,
      currentBlackCard: card,
      playedCards: [],
      currentCzarID: (G?.currentCzarID + 1) % ctx.numPlayers,
    };
  },
  next: "draw",
};
