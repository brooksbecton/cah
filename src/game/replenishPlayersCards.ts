import { groupBy } from "lodash";

import { drawCards } from "../utils/drawCard";
import { IGame } from "./types";

export function replenishPlayersCards(G: Partial<IGame>, ctx: any): Partial<IGame> {
  const playersCards = groupBy(G.hand, "playerID");
  let newDeck;
  let newHand;
  
  Object.keys(playersCards).forEach((playerID) => {
    const playersHand = playersCards[playerID];
    const cardsNeeded = G.cardLimit - playersHand.length;

    if (cardsNeeded > 0) {
      const { cards, deck } = drawCards(G.whiteCards, cardsNeeded);
      const cardsWithPlayerID = cards.map((text) => ({ text, playerID }));
      newDeck = deck;
      newHand = [...G.hand, ...cardsWithPlayerID];
    }
  });

  return { ...G, whiteCards: newDeck, hand: newHand };
}
