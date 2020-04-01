import { ActivePlayers } from "boardgame.io/core";

import { IGame, ICtx, ICard } from "../types/index";
import { replenishPlayersCards } from "../replenishPlayersCards";
import { drawCard as drawCardUtil } from "../../utils/drawCard";

export const voteCard = (G: IGame, ctx: ICtx, card: ICard) => {
  G.currentCzarID = (G?.currentCzarID + 1) % ctx.numPlayers;
  G.winnerCards = [...G?.winnerCards, card];
  G.playedCards = [];
};

export const vote = {
  turn: {
    activePlayers: ActivePlayers.ALL
  },
  moves: { voteCard },
  endIf: (G: IGame) => G?.playedCards.length === 0,
  onEnd: (G: IGame) => {
    const { card, deck } = drawCardUtil(G?.blackCards);
    return {
      ...G,
      ...replenishPlayersCards(G),
      blackCards: deck,
      currentBlackCard: card
    };
  },
  next: "draw"
};
