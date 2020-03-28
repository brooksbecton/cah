import { drawCard as drawCardUtil } from "./../../utils/drawCard";
import { Ctx } from "boardgame.io";
import { ActivePlayers } from "boardgame.io/core";
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
  onBegin: (G: IGame, ctx: Ctx) => {
    // Draw Player's cards
    let tG = G;
    Object.keys(ctx.playOrder).forEach(playerId => {
      for (let index = 0; index < G.cardLimit; index++) {
        tG = drawCard(tG, ctx, playerId);
      }
    });
    G = tG;

    // Draw black card
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
