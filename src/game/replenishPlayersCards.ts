import groupBy from "lodash.groupBy";

import { drawCards } from "../utils/drawCard";
import { IGame } from "./types";

export function replenishPlayersCards(G: Partial<IGame>): Partial<IGame> {
  const playersCards = groupBy(G.hand, "playerID");
  let newDeck = G.whiteCards;
  let newHand = G.hand;

  Object.keys(playersCards).forEach(playerID => {
    const playersHand = playersCards[playerID];
    const cardsNeeded = G.cardLimit - playersHand.length;

    if (cardsNeeded > 0) {
      const { cards, deck } = drawCards(G.whiteCards, cardsNeeded);
      const cardsWithPlayerID = cards.map(text => ({ text, playerID }));
      newDeck = deck;
      newHand = [...G.hand, ...cardsWithPlayerID];
    }
  });

  return { ...G, whiteCards: newDeck, hand: newHand };
}
