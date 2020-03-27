import { drawCard as drawCardUtil } from "./../../utils/drawCard";
import { ActivePlayers } from "boardgame.io/core";
import { filterPlayersCards } from "./../../utils/filterPlayersCards";
import { IGame, ICtx } from "./../types";

export function drawCard(G: IGame, ctx: any, playerID: string) {
  const { card, deck } = drawCardUtil(G.whiteCards);

  return {
    ...G,
    whiteCards: deck,
    hand: [...G.hand, { text: card, playerID: playerID }]
  };
}

export const draw = {
  turn: {
    activePlayers: ActivePlayers.ALL
  },
  moves: {
    drawCard
  },
  onBegin: (G: IGame) => {
    const { card, deck } = drawCardUtil(G.blackCards);
    return { ...G, blackCards: deck, currentBlackCard: card };
  },
  //   endTurnIf: (G: IGame) => {
  //     const playersHand = filterPlayersCards(G.hand, String(G.playerID));
  //     return playersHand.length === G.cardLimit;
  //   },
  endIf: (G: IGame, ctx: ICtx) => {
    return G.hand.length === ctx.numPlayers * G.cardLimit;
  },
  next: "play"
};
