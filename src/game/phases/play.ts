import { IGame, ICtx, ICard } from "./../types/index";
import { ActivePlayers } from "boardgame.io/core";

export const playCard = (G: IGame, ctx: ICtx, card: ICard) => {
  // Don't allow czar to play card on their turn
  if (Number(card.playerID) !== Number(G.currentCzarID)) {
    const cardIndex = G.hand.map(({ text }) => text).indexOf(card.text);

    // Removing played card from hand
    const newHand = [
      ...G.hand.slice(0, cardIndex),
      ...G.hand.slice(cardIndex + 1)
    ];

    G.playedCards = [...G.playedCards, card];
    G.hand = newHand;
  }
};

const endIf = (G: IGame, ctx: ICtx) => {
  return (
    G.playedCards.length === (ctx.numPlayers - 1) * G.currentBlackCard.pick
  );
};

export const play = {
  turn: {
    activePlayers: ActivePlayers.ALL
  },
  moves: { playCard },
  endIf,
  next: "vote"
};
